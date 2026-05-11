package ipset

import "net/netip"

var theTrie *Trie

func Contains(ipStr string) bool {

	ip, err := netip.ParseAddr(ipStr)
	if err != nil {
		return false
	}

	return theTrie.Contains(ip)
}
