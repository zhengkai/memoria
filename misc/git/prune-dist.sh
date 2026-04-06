#!/bin/bash

BRANCH="${1:-client-dist}"

echo "$BRANCH"
MAX_COMMITS=10

cd /tmp/memoria || exit 1

# 获取 commit 总数
TOTAL=$(git rev-list --count HEAD)

if [ "$TOTAL" -gt "$MAX_COMMITS" ]; then
    # 保留最新 10 个 commit 的 hash
    KEEP=$(git rev-list --reverse HEAD | tail -n $MAX_COMMITS)
    OLDEST_TO_KEEP=$(echo "$KEEP" | head -n 1)

    # 创建临时分支指向最新 10 个 commit 的最早一个
    git branch temp "$OLDEST_TO_KEEP"

    # 使用 rebase --root 压缩历史
    git checkout temp
    git reset --soft "$OLDEST_TO_KEEP"
    git commit -m "Squashed old commits to keep total $MAX_COMMITS"

    # 强制更新孤儿分支
    git branch -M "$BRANCH"
    git push -f origin "$BRANCH"
fi
