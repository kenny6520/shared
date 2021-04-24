#!/usr/bin/env bash

current_branch_name=$(git rev-parse --abbrev-ref HEAD)
frist_branch_name=$1
second_branch_name=$2

update_branch_name() {
    local old_branch_name="$1"
    local new_branch_name="$2"

    echo "旧分支名： ${old_branch_name} 更换到新分支名： ${new_branch_name}"
    git branch -m ${old_branch_name} ${new_branch_name}

    read -r -p "是否需要同时重命名对应的远程分支? [y/n] " is_rename_remote
    case $is_rename_remote in [yY][eE][sS] | [yY])
        git push --delete origin ${old_branch_name}
        git push origin ${new_branch_name}
        git branch --set-upstream-to origin/${new_branch_name}
        ;;
        *)
    esac
}

# 第一个分支名存在 && 第二个分支名不存在
# 将会被认为是需要将当前的分支从命名为当前输入的唯一新分支名
if [[ $frist_branch_name ]] && [[ $second_branch_name == '' ]]; then
    update_branch_name ${current_branch_name} ${frist_branch_name}
elif [[ $frist_branch_name ]] && [[ $second_branch_name ]]; then
   update_branch_name ${frist_branch_name} ${second_branch_name}
else
    echo "error: 参数不完整"
fi
