在 `tanya:/backup/tanya/memoria` 会有每日备份（tanya 应该每天执行 `./backup-tanya.sh`）

`./sync-tanya.sh` 会取最新的备份并还原

如果 tanya 失能了，取任意备份可以用 `./restore.sh <文件.dump>` 来还原
