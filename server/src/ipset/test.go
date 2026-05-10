package ipset

import (
	"project/util"
	"project/zj"
)

func Test() {

	t := util.BenchStart()

	list := []string{
		`192.168.50.1`,
		`127.0.0.1`,
		`202.130.251.3`,
	}

	for _, ip := range list {
		zj.J(`ip test`, ip, Contains(ip))
	}

	zj.J(`ip test`, t)
}
