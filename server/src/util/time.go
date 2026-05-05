package util

import "time"

type BenchTime time.Time

func Now() uint64 {
	return uint64(time.Now().UnixMilli())
}

func BenchStart() BenchTime {
	return BenchTime(time.Now())
}

func (t BenchTime) ElapsedMS() time.Duration {
	dur := time.Since(time.Time(t))
	dur -= dur % time.Millisecond
	return dur
}
