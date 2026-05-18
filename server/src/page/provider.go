package page

type Provider interface {
	File() string
	Link() string
}

type PItem uint64

func (id PItem) File() string {
	return FileItem(id)
}

func (id PItem) Link() string {
	return LinkItem(id)
}

type PNote uint32

func (year PNote) File() string {
	return FileNote(year)
}

func (year PNote) Link() string {
	return LinkNote(year)
}

type PArticle struct{}

func (a PArticle) File() string {
	return FileArticle
}

func (a PArticle) Link() string {
	return LinkArticle
}

type PCurated struct{}

func (a PCurated) File() string {
	return FileCurated
}

func (a PCurated) Link() string {
	return LinkCurated
}

type PTrash struct{}

func (a PTrash) File() string {
	return FileTrash
}

func (a PTrash) Link() string {
	return LinkTrash
}

type PHome struct{}

func (h PHome) File() string {
	return FileHome
}

func (h PHome) Link() string {
	return LinkHome
}

type PStyle struct{}

func (s PStyle) File() string {
	return FileStyle
}

func (s PStyle) Link() string {
	return `/style.css` // TODO 还不知道会不会用到
}
