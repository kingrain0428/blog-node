const { exec } = require('../db/mysql');
//列表接口
const getListData = (author, keyword) => {
    let sql = `select * from blogs where 1=1 `;
    if (author) {
        sql += `and author='${author}' `
    }
    if (keyword) {
        sql += `and id=${keyword} `
    }
    sql += `order by createtime desc`;
    return exec(sql).then(listData => {
        return listData
    })
}
//详情接口
const getDetailData = (id) => {
    const sql = `select * from blogs where id=${id}`;
    const detailResult = exec(sql);
    return detailResult.then(detailData => {
        return detailData[0]
    })
}
//新建博客接口
const blogNew = (postBody) => {
    // postBody.author = `zidingyi${Math.round(Math.random() * 100)}`
    const { title = '', content = '', author } = postBody;
    const createTime = Date.now();
    const sql = `
        insert into blogs (title, content, createtime, author) 
        values ('${title}', '${content}', ${createTime}, '${author}')
    `
    const newBlogResult = exec(sql);
    return newBlogResult.then(newBlogData => {
        return {
            id: newBlogData.insertId
        }
    })
}
//更新博客接口
const blogUpdate = (postBody) => {
    const { id, title, content } = postBody;
    const createTime = Date.now();
    const sql = `update blogs set title='${title}', content='${content}', createtime='${createTime}' where id=${id}`;
    const blogUpdateResult = exec(sql);
    return blogUpdateResult.then(blogUpdataData => {
        if (blogUpdataData.affectedRows) {
            return true
        }
        return false
    })
}
//删除博客接口
const blogDelete = (postBody) => {
    const { id } = postBody;
    const sql = `delete from blogs where id=${id}`;
    const result = exec(sql);
    return result.then(data => {
        if (data.affectedRows) {
            return true
        }
        return false
    })
}

module.exports = {
    getListData,
    getDetailData,
    blogNew,
    blogUpdate,
    blogDelete
}