function listToTree(list) {
    let map = {},
        node,
        roots = [],
        index;

    for (index = 0; index < list.length; index += 1) {
        map[list[index].id] = index;
        list[index].children = [];
    }

    for (index = 0; index < list.length; index += 1) {
        node = list[index];
        if (node.parentId !== "0") {
            list[map[node.parentId]].children.push(node);
        } else {
            roots.push(node);
        }
    }

    return roots;
}

export { listToTree };
