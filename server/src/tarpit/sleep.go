package tarpit

import (
	"time"
)

func (t *tarpit) Sleep() {

	select {
	case <-time.After(time.Hour): // tarpit 时长
		t.flood() // 继续 flood
	case <-t.R.Context().Done():
		t.weapon = `sleep`
		// 客户端断开或超时，结束等待
		return
	}

	for {
		select {
		case <-t.R.Context().Done():
			return
		default:
			time.Sleep(time.Second)
			_, err := t.Write(alertMsg)
			if err != nil {
				return
			}
		}
	}
}
