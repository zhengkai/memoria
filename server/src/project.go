// Package project
package project

import (
	"project/build"
	"project/db"
	"project/util"
	"project/web"
	"project/zj"
)

func run() {

	build.DumpBuildInfo()

	zj.Init()

	util.InitDirCheck()

	db.WaitConn()

	go web.Server()
}

func afterRun() {
}
