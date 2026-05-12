package page

import (
	"project/config"
	"project/util"
	"project/zj"
	"strconv"
)

const (
	memoryCompressLimit = 1200 // 少于此字节不压缩，加头大概率少于 MTU

	MimeHTML = `text/html; charset=utf-8`
	MimeCSS  = `text/css; charset=utf-8`
)

type Page struct {
	Content

	Code int

	ETag string
	Mime string

	Forever       bool // 指只要有 etag 就永远 304
	HeaderExpires Expire

	Gzip   PageCompress
	Brotli PageCompress
}

type PageCompress struct {
	Content
	Available bool
}

// 对于已经有 raw（可用下限）的 page，继续尝试 gzip / brotli 压缩
func (p *Page) compress() {
	p._compress(`.gz`, util.GzipFile, &p.Gzip)
	p._compress(`.br`, util.BrotliFile, &p.Brotli)
}

func (p *Page) _compress(ext string, fn util.FnCompress, c *PageCompress) error {

	sf := p.Ext(ext)

	p.GetHash()
	if p.Hash != nil {
		hash, _ := sf.GetHash()
		if hash != nil && *hash == *p.Hash {
			// 如果 hash 匹配，小于 8KB 就放内存，超过则将来读硬盘
			size, err := sf.Size()
			if err != nil {
				return err
			}
			c.Available = true
			c.Import(sf, size)
			if config.MemoryFileSizeLimit < 1 || size < config.MemoryFileSizeLimit {
				ab, err := sf.ReadBin()
				if err != nil {
					// 如果有错误，说明文件读写有问题，放弃压缩
					c.Available = false
					return err
				}
				c.Data = ab
			}
			return nil
		}
	}

	ab, err := fn(p.File)
	if err != nil {
		zj.WF(`compress %s%s error: %v`, p.File, ext, err)
		return err
	}

	size := len(ab)
	if config.MemoryFileSizeLimit < 1 || size < config.MemoryFileSizeLimit {
		c.Data = ab
		c.Available = true
	}
	c.Size = strconv.Itoa(size)
	err = sf.WriteBin(*p.Hash, ab)
	if err == nil {
		c.Path = sf.Path
		c.Available = true
	}

	return nil
}
