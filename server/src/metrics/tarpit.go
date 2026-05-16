package metrics

import "time"

var (
	tarpitCount   = newCounterVec(`tarpit_count`, `Tarpit 计数`, `code`)
	tarpitTraffic = newCounterVec(`tarpit_traffic`, `Tarpit 流量`, `code`)
	tarpitTime    = newCounterVec(`tarpit_time_ms`, `Tarpit 时间（毫秒）`, `code`)
)

func Tarpit(weapon string, traffic int, time time.Duration) {
	tarpitCount.WithLabelValues(weapon).Inc()
	tarpitTraffic.WithLabelValues(weapon).Add(float64(traffic))
	tarpitTime.WithLabelValues(weapon).Add(float64(time))
}
