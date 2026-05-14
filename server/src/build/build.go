package build

import (
	"fmt"
	"project/config"
)

// BuildGoVersion ...
var BuildGoVersion string

// BuildTime ...
var BuildTime string

// BuildType ...
var BuildType string

// BuildHost ...
var BuildHost string

// BuildGit ...
var BuildGit string

// DumpBuildInfo ...
func DumpBuildInfo() {
	fmt.Println()
	fmt.Println(BuildGoVersion)
	fmt.Println(BuildTime)
	fmt.Println(BuildType)

	host := BuildHost
	if config.HostName != `unknown` && config.HostName != host {
		host += ` (` + config.HostName + `)`
	}
	fmt.Println(host)
	fmt.Println(BuildGit)
	fmt.Println()
}
