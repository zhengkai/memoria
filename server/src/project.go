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

	os.MkdirAll(util.Static(`tmp`), 0755)

	zj.Init()

	util.InitDirCheck()

	if config.Publish {
		go public.Handle.Run()
	} else {
		db.WaitConn()
	}

	go web.Server()

	// render.Test()
	// page.NewPage()
}

func afterRun() {
}
