package page

import (
	"project/util"
	"strconv"
)

const (
	memoryFileSizeLimit = 8192 // 少于此字节放内存，否则大概率走 nginx x-accel
	memoryCompressLimit = 1200 // 少于此字节不压缩，加头大概率少于 MTU

	MimeHTML = `text/html; charset=utf-8`
	MimeCSS  = `text/css; charset=utf-8`
)

type Page struct {
	util.StaticFile
	FileSize string

	ETag string
	Mime string

	Forever bool

	Raw []byte

	Gzip   PageCompress
	Brotli PageCompress
}

type PageCompress struct {
	Available bool
	Size      string
	Data      []byte
	Path      string
}

// 对于已经有 raw（可用下限）的 page，继续尝试 gzip / brotli 压缩
func (p *Page) compress() {
	p._compress(p.Ext(`.gz`), util.GzipFile, &p.Gzip)
	p._compress(p.Ext(`.br`), util.BrotliFile, &p.Brotli)
}

func (p *Page) _compress(sf *util.StaticFile, fn util.FnCompress, c *PageCompress) error {

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
			c.Size = strconv.FormatInt(size, 10)
			c.Path = sf.Path
			if size < memoryFileSizeLimit {
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
		return err
	}

	c.Size = strconv.Itoa(len(ab))
	err = sf.WriteBin(*p.Hash, ab)
	if err != nil || len(ab) < memoryFileSizeLimit {
		c.Data = ab
	}

	return nil
}
