package metrics

var (
	fileWriteCount = newCounter(`file_write_count`, `build 写文件次数`)
)

func FileWrite() {
	fileWriteCount.Inc()
}
