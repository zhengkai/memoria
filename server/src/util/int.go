package util

func Uint64(i int64) uint64 {
	if i < 0 {
		return 0
	}
	return uint64(i)
}
