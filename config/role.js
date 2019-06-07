const roleRight = {
    all: [{
        name: '文章管理',
        func: 'article'
    }, {
        name: '评论管理',
        func: 'comment'
    }, {
        name: '头像上传',
        func: 'userface'
    }]
}

roleRight[666] = [{
    name: '用户管理',
    func: 'user'
}];


module.exports = role => {
    return roleRight.all.concat(roleRight[role] || []);
};