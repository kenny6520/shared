#!/usr/bin/env bash

read -p "请输入commit信息 " commit

# 获取当前分支名称
branch=$(git rev-parse --abbrev-ref HEAD)

# 创建push.txt用于存储多行+变量的文件
cat >push.txt <<EOF

你的提交信息如下

    🤔 当前Branch为: $branch
    🤨 当前Commit信息为: $commit

EOF
# 输出文件内容
cat push.txt

# 删除临时文件
rm -rf push.txt

read -r -p "你的提交信息是否正确? [y/n] " is_correct

case $is_correct in
[yY][eE][sS] | [yY])
    # 本地commit记录
    git add . || git add --all
    git commit -m "$commit"

    # 获取分支所对应的远程地址
    remote=$(git config branch."${branch}".remote || echo "origin")
    remote_url=$(git remote get-url $remote)

    if [[ $remote_url == "" ]]; then
        cat <<HERE

找不到当前分支对应的远程仓库, 你可能需要
    😡 添加仓库地址: git remote add origin <remote_url> 这是你需要的
    🧐 再添加一个远程仓库: git remote add <name> <new_remote_url>

HERE

        exit 1
    else
        # 提交到同名的远程分支
        # git push origin "$branch_name":"$branch_name"

        # 暂时使用git push
        git push
        exit 1
    fi
    ;;

[nN][oO] | [nN])
    exit 1
    echo "退出操作..."
    ;;
*)
    echo "输入有误, 程序退出..."
    exit 1
    ;;
esac
