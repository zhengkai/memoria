用于 ip 段（其实应该叫 CIDR set）黑名单

不考虑 `fastBits`，本身 `Trie` 是一个前缀树，ip 的每一 bit 对应一层 `*node`，  
如果 `end` 为真表示找到

因为一条 CIDR （如 `223.198.0.0/15`）的前缀（例子里是`15`）不可能很小，  
为了提升效率，`fastBits` 表示 ip 段的前 n bits 放在一个固定长度的 array 里，  
一次就可以命中，后面再逐 bit 查找

所以 `fastBits` 少了增加时间，多了增加空间

TODO: 把每层 1bit 改为可选 n bits
