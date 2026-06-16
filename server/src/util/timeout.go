package util

import (
	"context"
	"time"

	"github.com/zhengkai/life-go"
)

func CTXTimeoutQuick() (context.Context, context.CancelFunc) {
	return life.CTXTimeout(5 * time.Second)
}

func CTXTimeout() (context.Context, context.CancelFunc) {
	return life.CTXTimeout(30 * time.Second)
}

func CTXTimeoutLong() (context.Context, context.CancelFunc) {
	return life.CTXTimeout(300 * time.Second)
}
