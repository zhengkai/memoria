package ipset

import "net/netip"

var theTrie = New()

func Contains(ipStr string) bool {

	ip, err := netip.ParseAddr(ipStr)
	if err != nil {
		return false
	}

	return theTrie.Contains(ip)
}
