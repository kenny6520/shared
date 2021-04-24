#!/usr/bin/env bash

current_branch_name=$(git rev-parse --abbrev-ref HEAD)
target_branch=$1

echo -e "当前分支为: ${current_branch_name} 目标分支为: ${target_branch}"

git checkout $target_branch
git pull --rebase

git checkout $current_branch_name

read -r -p "如果有需要, 是否为你打开交互式的rebase, 这将可以用来合并多个commit? [y/n] " is_open
case $is_open in [yY][eE][sS] | [yY])
    git rebase -i --autosquash $target_branch
    ;;
*) git rebase $target_branch ;;
esac

read -r -p "是否为你强制推送到远程仓库, 这将会覆盖远程历史? [y/n]" is_push
case $is_push in [yY][eE][sS] | [yY])
    git push -f
    exit 1
    ;;
*)
    # 创建rebase.txt用于存储多行+变量的文件
    cat <<HERE

接下来你可能需要进行下面操作
    🤔 推送到远程仓库: git push
    🤨 强制推送到远程仓库: git push -f

HERE
    ;;
esac