package ipset

import (
	"project/util"
	"project/zj"
)

func init() {

	go func() { // 不阻塞启动，刚启动的几毫秒里是不检测的
		t := util.BenchStart()
		next := &Trie{}
		for _, s := range ipRanges {
			next.InsertCIDR(s)
		}
		theTrie = next
		zj.F(`ipset init cost: %s`, t)

		go update()
	}()
}
