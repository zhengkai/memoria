package ban

func Check(ip string) bool {
	if ip == `` {
		return false
	}
	return theBan.check(ip)
}

func Add(ip string) {
	if ip == `` {
		return
	}
	theBan.add(ip)
}
