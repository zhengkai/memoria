package main

// 根据 api.proto 生成 server/src/api/dispatch.go

import (
	"bufio"
	"bytes"
	"fmt"
	"os"
	"path/filepath"
	"regexp"
	"runtime"
	"strings"
)

var reSwitchBlock = regexp.MustCompile(`(?s)(switch req\.WhichOne\(\) \{).*?(\})`)

func lowerFirst(s string) string {
	return strings.ToLower(s[:1]) + s[1:]
}

func snakeToPascal(s string) string {
	p := strings.Split(s, `_`)
	for i := range len(p) {
		if len(p[i]) > 0 {
			p[i] = strings.ToUpper(p[i][:1]) + p[i][1:]
		}
	}
	return strings.Join(p, ``)
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

	srcFile, fields, src, err := getSource(filename)
	if err != nil {
		return
	}

	var rp bytes.Buffer
	rp.WriteString("${1}\n")

	for _, f := range fields {
		F := snakeToPascal(f)
		f = lowerFirst(F)

		fmt.Fprintf(&rp, `
	case pb.APIReq_%s_case:
		rsp.Set%s(%s(req.Get%s(), e))
`, F, F, f, F)
	}

	rp.WriteString(`
	default:
		e.SetMessage(pb.Error_INPUT_MISSING, "missing oneof field")`)

	rp.WriteString("\n\t${2}")

	dst := reSwitchBlock.ReplaceAll(src, rp.Bytes())

	// fmt.Println(`[`, rp.String(), `]`)
	fmt.Println()
	for _, s := range fields {
		fmt.Println("\t", s)
	}

	fmt.Println()
	if bytes.Equal(src, dst) {
		fmt.Println(`no change, skip writing file`)
		return
	}
	fmt.Println(`writing file`, srcFile)
	os.WriteFile(srcFile, dst, 0644)
}

func getSource(filename string) (string, []string, []byte, error) {

	protoDir := filepath.Dir(filepath.Dir(filename))
	protoFile := filepath.Join(protoDir, `api.proto`)

	fields, err := extractFieldsFromProto(protoFile)
	if err != nil {
		fmt.Println("read api.proto failed:", err)
		return ``, nil, nil, err
	}

	dir := filepath.Dir(protoDir)
	filename = filepath.Join(dir, `server`, `src`, `api`, `dispatch.go`)

	src, err := os.ReadFile(filename)
	if err != nil {
		fmt.Println(`can not read file`, filename)
		return ``, nil, nil, err
	}

	return filename, fields, src, nil
}
