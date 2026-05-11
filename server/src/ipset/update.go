package ipset

import (
	"net/netip"
	"project/util"
	"project/zj"
	"time"
)

var chnIPForTest, _ = netip.ParseAddr(`202.130.251.3`)

func update() {

	file := util.NewStaticFile(`chn-ip/ipv4.txt`)

	file.Monitor(time.Hour, func(t time.Time) {
		nt := &Trie{}
		var err error
		var s string
		var cnt int
		for s, err = range file.ReadLine() {
			cnt++
			if err != nil {
				break
			}
			err = nt.InsertCIDR(s)
			if err != nil {
				break
			}
		}
		if err != nil {
			zj.W(`update ipset fail:`, err)
			return
		}
		if cnt < 8000 {
			zj.W(`update ipset fail: only %d lines`, cnt, file)
			return
		}
		if !nt.Contains(chnIPForTest) {
			zj.W(`update ipset fail: test ip not pass`)
			return
		}
		zj.F(`ipset updated from file, total %d lines, date %s`, cnt, t.Format(time.DateTime))
		theTrie = nt
	})
}
