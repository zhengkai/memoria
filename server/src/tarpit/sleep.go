package tarpit

import (
	"project/metrics"
	"time"
)

func (t *tarpit) Sleep() {

	metrics.TarpitCount(`sleep`)

	select {
	case <-time.After(10 * time.Minute): // tarpit 时长
		// 正常结束
	case <-t.R.Context().Done():
		// 客户端断开或超时，结束等待
		return
	}
}
