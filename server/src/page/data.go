package page

import (
	"html/template"
	"project/pb"
)

type Item struct {
	ID      uint64
	DB      pb.ItemDB
	Content template.HTML
	Error   error
}
