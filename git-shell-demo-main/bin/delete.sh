#!/usr/bin/env bash

del_local_branch_name=$1
del_origin_branch=$2

# 删除本地分支
echo "开始删除本地${del_local_branch_name}分支"
git branch -d $del_origin_branch

# 没有填写第二个参数
if [ del_origin_branch == "" ]; then
    read -r -p "是否同时删除同名的远程分支" is_delete
    case $is_open in
    [yY][eE][sS] | [yY])
        git push origin --delete ${del_local_branch_name}
        ;;
    *) git rebase $target_branch ;;
    esac
    exit 1
else
    git push origin --delete ${del_local_branch_name}
    exit 1
fi
