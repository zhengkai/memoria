package metrics

var (
	tarpitCount = newCounterVec(`tarpit_count`, `Tarpit 计数`, `code`)
)

func TarpitCount(s string) {
	tarpitCount.WithLabelValues(s).Inc()
}
