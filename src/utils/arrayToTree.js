export default (array) => {

    const tree = {}

    array.forEach(user => { tree[user.id] = user })

    Object.keys(tree).forEach(userId => {

        if (tree[userId].managerId) {
            const managerId = tree[userId].managerId;

            if (tree[managerId].children) {
                tree[managerId].children.push(userId);
            } else {
                tree[managerId].children = [userId];
            }
        }
    })

    return tree;
}