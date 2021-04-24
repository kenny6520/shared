#!/usr/bin/env bash

local_branch_name=$1
current_branch_name=$(git rev-parse --abbrev-ref HEAD)

handle_error_prompt(){
    local message="$1"
    echo "Error: $message"
}

delete_branch(){
    local delete_branch="$1"

    read -r -p "Note: 是否同时删除对应远程分支？ [y/n]" is_delete_remote_branch
    case "$is_delete_remote_branch" in 
        [yY][eE][sS] | [yY])
            git branch -d $delete_branch
            git push origin --delete $delete_branch
            exit 1
        ;;
        [nN][oO] | [nN])
            git branch -d $delete_branch
            exit 1
        ;;
    esac
}

if [[ $current_branch_name == $local_branch_name ]] ; then
    handle_error_prompt "不能删除当前的分支, HEAD指向删除的分支"
else
    delete_branch ${local_branch_name}
fi