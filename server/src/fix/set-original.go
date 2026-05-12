package fix

import (
	"project/db"
	"project/util"
	"project/zj"
)

func fixOriginal() {
	li, err := util.NewStaticFile(`org`).ReadDir()
	if err != nil {
		zj.W(`read dir fail:`, err)
		return
	}

	for _, f := range li {
		zj.J(`fix file:`, f.Path)
		for s := range f.ReadLine() {

			id := util.FirstNum(s)

			it, err := db.LoadItem(id)
			if err != nil {
				zj.W(`load item fail:`, id, err)
				continue
			}

			if it.GetMeta().GetOriginal() {
				// zj.W(`skip item :`, id)
				continue
			}

			it.GetMeta().SetOriginal(true)
			err = db.SaveItem(it)
			if err != nil {
				zj.W(`save item fail:`, id, err)
				continue
			}

			zj.J(`fix item`, id)
		}
	}
}
