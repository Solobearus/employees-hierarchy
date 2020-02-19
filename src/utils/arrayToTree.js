export default (array) => {

    const tree = {}

    array.forEach((user, index) => { user && (tree[user.id] = { ...user, userIndexInDB: index }) })

    Object.keys(tree).forEach(userId => {

        if (tree[userId].managerId) {
            const managerId = tree[userId].managerId;

            if (tree[managerId]) {
                if (tree[managerId].children) {
                    tree[managerId].children.push(userId);
                } else {
                    tree[managerId].children = [userId];
                }
            } else {
                tree[userId].managerId = undefined;
            }
        }
    })

    return tree;
}