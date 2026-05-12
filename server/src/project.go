// Package project
package project

import (
	"os"
	"project/build"
	"project/config"
	"project/db"
	"project/public"
	"project/util"
	"project/web"
	"project/zj"
)

func run() {

	build.DumpBuildInfo()

	os.MkdirAll(util.Static(`tmp`), config.DirFileMode)

	zj.Init()

	util.InitDirCheck()

	if config.Publish {
		go public.Handle.Run()
	} else {
		if !config.Prod {
			go public.Handle.Run()
		}
		db.WaitConn()
	}

	go web.Server()

	// go fix.Run()
	// go test()
}

func afterRun() {
}
