package main

// 根据 api.proto 生成 server/src/api/dispatch.go

import (
	"bufio"
	"bytes"
	"fmt"
	"go/ast"
	"go/format"
	"go/parser"
	"go/token"
	"os"
	"path/filepath"
	"regexp"
	"runtime"
	"strings"
)

func upperFirst(s string) string {
	return strings.ToUpper(s[:1]) + s[1:]
}

func parseStmt(code string) ast.Stmt {
	src := "package api\nfunc _(){\nswitch r := x.(type) {\n" + code + "}\n}"

	fset := token.NewFileSet()
	f, err := parser.ParseFile(fset, "", src, 0)
	if err != nil {
		panic(err)
	}

	fn := f.Decls[0].(*ast.FuncDecl)
	sw := fn.Body.List[0].(*ast.TypeSwitchStmt)

	return sw.Body.List[0] // *ast.CaseClause
}

func extractFieldsFromProto(path string) ([]string, error) {
	f, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	defer f.Close()

	var (
		inAPIReq bool
		inOneof  bool
		fields   []string
	)

	// 匹配：ItemEdit itemEdit = 10;
	re := regexp.MustCompile(`^\s*\w+\s+(\w+)\s*=`)

	scanner := bufio.NewScanner(f)
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())

		// 进入 message APIReq
		if strings.HasPrefix(line, "message APIReq") {
			inAPIReq = true
			continue
		}

		if inAPIReq {
			// 进入 oneof
			if strings.HasPrefix(line, "oneof ") {
				inOneof = true
				continue
			}

			// 退出 oneof
			if inOneof && strings.HasPrefix(line, "}") {
				inOneof = false
				continue
			}

			// 退出 APIReq
			if strings.HasPrefix(line, "}") {
				inAPIReq = false
				continue
			}

			// 提取字段
			if inOneof {
				if m := re.FindStringSubmatch(line); len(m) == 2 {
					fields = append(fields, m[1])
				}
			}
		}
	}

	if err := scanner.Err(); err != nil {
		return nil, err
	}

	return fields, nil
}

func main() {

	_, filename, _, ok := runtime.Caller(0)
	if !ok {
		panic(`cannot get current file`)
	}

	protoDir := filepath.Dir(filepath.Dir(filename))
	protoFile := filepath.Join(protoDir, `api.proto`)

	fields, err := extractFieldsFromProto(protoFile)
	if err != nil {
		fmt.Println("read api.proto failed:", err)
		return
	}

	dir := filepath.Dir(protoDir)
	filename = filepath.Join(dir, `server`, `src`, `api`, `dispatch.go`)

	srcAB, err := os.ReadFile(filename)
	if err != nil {
		fmt.Println(`can not read file`, filename)
		return
	}

	fset := token.NewFileSet()
	file, err := parser.ParseFile(token.NewFileSet(), ``, srcAB, parser.ParseComments)
	if err != nil {
		fmt.Println(`parse file failed:`, err)
		return
	}

	ast.Inspect(file, func(n ast.Node) bool {
		sw, ok := n.(*ast.TypeSwitchStmt)
		if !ok {
			return true
		}

		// 匹配：switch r := req.One.(type)
		assign, ok := sw.Assign.(*ast.AssignStmt)
		if !ok || len(assign.Rhs) != 1 {
			return true
		}

		assert, ok := assign.Rhs[0].(*ast.TypeAssertExpr)
		if !ok || assert.Type != nil {
			return true
		}

		sel, ok := assert.X.(*ast.SelectorExpr)
		if !ok || sel.Sel.Name != "One" {
			return true
		}

		var newList []ast.Stmt
		for _, f := range fields {
			F := upperFirst(f)

			code := fmt.Sprintf(`
case *pb.APIReq_%s:
	x := &pb.APIRsp_%s{}
	x.%s, ae = %s(r.%s)
	rsp = x
`, F, F, F, f, F)

			stmt := parseStmt(code)
			newList = append(newList, stmt)
		}

		sw.Body.List = newList
		return false
	})

	var buf bytes.Buffer
	if err = format.Node(&buf, fset, file); err != nil {
		panic(err)
	}

	ab := buf.Bytes()
	if bytes.Equal(srcAB, ab) {
		fmt.Println(`no change, skip writing file`)
		return
	}

	fmt.Println(string(ab))

	os.WriteFile(filename, ab, 0644)
}
