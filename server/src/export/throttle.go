package export

import (
	"project/zj"

	"github.com/zhengkai/life-go"
)

// 每 5 分钟才触发一次 export

var chThrottle = make(chan bool, 1)

func Trigger() {
	select {
	case chThrottle <- true:
	default:
	}
}

func throttleLoop() bool {
	for {
		<-chThrottle
		zj.J(`export throttle triggered`)
		zj.J(Run(false))
		zj.J(`done`)
		// life.Sleep(300)
		life.Sleep(10)
	}
}
