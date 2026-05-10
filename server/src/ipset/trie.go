// Package ipset 黑名单检测
package ipset

import (
	"fmt"
	"net/netip"
)

const (
	fastBits = 16 // 最关键，见本目录 README.md

	fastSize  = 1 << fastBits
	totalBits = 32
)

type node struct {
	child [2]*node
	end   bool
}

type Trie struct {
	table [fastSize]*node
}

func New() *Trie {
	return &Trie{}
}

func (t *Trie) InsertCIDR(cidr string) error {
	prefix, err := netip.ParsePrefix(cidr)
	if err != nil {
		return fmt.Errorf("invalid cidr %q: %w", cidr, err)
	}

	addr := prefix.Addr()

	if !addr.Is4() {
		return nil
	}

	ip := addr.As4()
	bits := prefix.Bits()

	// 小于 fastBits:
	// 直接覆盖 table 多项
	if bits <= fastBits {

		base := firstN(ip, bits)

		remain := fastBits - bits
		count := 1 << remain

		n := &node{
			end: true,
		}

		start := int(base) << remain
		for i := range count {
			t.table[start+i] = n
		}

		return nil
	}

	idx := firstN(ip, fastBits)

	n := t.table[idx]

	// table 里可能已经是更大 CIDR
	if n != nil && n.end {
		return nil
	}

	if n == nil {
		n = &node{}
		t.table[idx] = n
	}

	// 从 fastBits 开始
	for i := fastBits; i < bits; i++ {
		if n.end {
			return nil
		}

		bit := getBit(ip, i)

		if n.child[bit] == nil {
			n.child[bit] = &node{}
		}

		n = n.child[bit]
	}

	n.end = true

	// 剪枝
	n.child[0] = nil
	n.child[1] = nil

	return nil
}

func (t *Trie) Contains(ip netip.Addr) bool {

	if !ip.Is4() {
		return false
	}

	v := ip.As4()

	n := t.table[firstN(v, fastBits)]

	if n == nil {
		return false
	}

	// 大 CIDR 直接命中
	if n.end {
		return true
	}

	for i := fastBits; i < totalBits; i++ {
		bit := getBit(v, i)
		n = n.child[bit]
		if n == nil {
			return false
		}
		if n.end {
			return true
		}
	}

	return false
}

func firstN(ip [4]byte, bits int) uint16 {
	var v uint16
	for i := range bits {
		v <<= 1
		v |= uint16(getBit(ip, i))
	}
	return v
}

func getBit(ip [4]byte, i int) byte {
	return (ip[i/8] >> (7 - uint(i%8))) & 1
}
