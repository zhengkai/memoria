package util

import "fmt"

func DebugHEX(ab []byte, limit int) string {
	size := len(ab)
	if size == 0 {
		return `<empty>`
	}
	if size > limit {
		ab = ab[:limit]
	}
	return fmt.Sprintf(`%x`, ab)
}
