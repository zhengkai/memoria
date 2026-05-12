// Package fix bug
package fix

import "project/config"

func Run() {
	if config.Publish {
		return
	}
	fixOriginal()
}
