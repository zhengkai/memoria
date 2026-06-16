package util

var mimeMap = map[string]string{
	`zip`:  `application/x-zip-compressed`,
	`gz`:   `application/gzip`,
	`jpg`:  `image/jpeg`,
	`txt`:  `text/plain`,
	`bmp`:  `image/bmp`,
	`png`:  `image/png`,
	`webp`: `image/webp`,
	`gif`:  `image/gif`,
	`html`: `text/html`,
}

func GetMime(ext string) string {
	if mime, ok := mimeMap[ext]; ok {
		return mime
	}
	return `application/octet-stream`
}
