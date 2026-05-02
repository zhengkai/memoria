// Package project
package project

import (
	"os"
	"project/build"
	"project/db"
	"project/util"
	"project/web"
	"project/zj"
)

func run() {

	build.DumpBuildInfo()

	os.MkdirAll(util.Static(`tmp`), 0755)

	zj.Init()

	util.InitDirCheck()

	db.WaitConn()

	go web.Server()
}

func afterRun() {
}
