简单尝试了 zstd 压缩，没想象得那么高，可能不太适合压文章  
（比如 json 里每个 key 都只出现一次，但每个 json 都有同样 key，就比较合适）

样本不够好（直接把 page 目录拿来压了，没把每个 item 拆开），简单数据记录一下：

```
70455 article.html
13253 article.html.br
17807 article.html.gz

16251 article.html.zst
```

```
15505 2026.html
 5597 2026.html.br
 7191 2026.html.gz

 5202 2026.html.zst
```
