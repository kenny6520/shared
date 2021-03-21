function deepFirstSearch(node, list) {
    if (node) {
        list.push(node);
        const children = node.children || [];

        for (let i = 0; i < children.length; i++) {
            deepFirstSearch(children[i], list);
        }
    }

    return list;
}

export { deepFirstSearch };
