export function arraytotree(arr) {
    var top = [],
        sub = [],
        tempObj = {};
    arr.forEach((item) => {
        if (item.parentid == '0') {
            // 顶级分类
            top.push(item);
        } else {
            sub.push(item); // 其他分类
        }
        item.children = []; // 默然添加children属性
        tempObj[item.id] = item; // 用当前分类的id做key，存储在tempObj中
    });
    sub.forEach((item) => {
        // 取父级
        var parent = tempObj[item.parentid] || {children: []};
        // 把当前分类加入到父级的children中
        parent.children.push(item);
    });
    return top;
}
