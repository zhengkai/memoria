package util

import (
	"regexp"
	"strconv"
)

var reNum = regexp.MustCompile(`\d+`)

func FirstNum(s string) uint64 {
	re := regexp.MustCompile(`\d+`)
	match := re.FindString(s)
	if match == `` {
		return 0
	}
	n, err := strconv.ParseUint(match, 10, 64)
	if err != nil {
		return 0
	}
	return n
}
