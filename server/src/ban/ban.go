// Package ban 黑名单
package ban

import (
	"project/pb"
	"project/util"
	"sort"

	"github.com/zhengkai/life-go"
)

const (
	keepNum        = 100
	evictThreshold = 120
	safeNum        = 1000
)

var theBan *ban
var file = util.NewStaticFile(`ban.json`)

type ban struct {
	Data         pb.Ban
	Map          map[string]*pb.BanRow
	MapRead      map[string]bool
	ch           chan string
	ver          int
	verScheduled int
}

func (b *ban) check(ip string) bool {
	if b == nil {
		return false
	}
	has := b.MapRead[ip]
	if has {
		b.add(ip)
	}
	return has
}

func (b *ban) add(ip string) {
	select {
	case b.ch <- ip:
	default:
	}
}

func (b *ban) genNewRead() {
	nm := make(map[string]bool, len(b.Map))
	for k := range b.Map {
		nm[k] = true
	}
	b.MapRead = nm
}

func (b *ban) listenAdd() {

	// 定期整理
	go func() {
		for {
			life.Sleep(67)
			b.add(``)
		}
	}()

	for ip := range b.ch {
		if ip == `` {
			b.scheduled()
			continue
		}
		b.ver++
		v := b.Map[ip]
		if v == nil {
			if len(b.Map) > safeNum {
				continue
			}
			v = pb.BanRow_builder{
				Ip: &ip,
			}.Build()
			b.Map[ip] = v
			b.genNewRead()
		}
		v.SetCnt(v.GetCnt() + 1)
		v.SetTs(util.Now())
	}
}

func (b *ban) scheduled() {

	if b.verScheduled == b.ver {
		// zj.F(`same ver %d, skip`, b.ver)
		return
	}
	b.verScheduled = b.ver

	size := len(b.Map)
	li := make([]*pb.BanRow, size)
	var idx int
	for _, v := range b.Map {
		li[idx] = v
		idx++
	}
	sort.Slice(li, func(i, j int) bool {
		return li[i].GetTs() > li[j].GetTs()
	})

	// evict

	if size > evictThreshold {
		for _, v := range li[keepNum:] {
			delete(b.Map, v.GetIp())
		}
		b.genNewRead()
	}

	// save

	b.Data.SetList(li)
	file.WriteJSON(&b.Data)
}
