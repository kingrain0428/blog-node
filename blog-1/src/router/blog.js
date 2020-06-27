const { 
    getListData, 
    getDetailData, 
    blogNew,
    blogUpdate,
    blogDelete
} = require('../controller/blog');
const { SuccessModel, ErrModel } = require('../model/resModel');

function loginCheck (req) {
    if (!req.session.username) {
        return Promise.resolve(new ErrModel('登录失败'))
    }
}

const handleBlogRouter = (req, res) => {
    const method = req.method;
    //列表接口
    if (method === 'GET'&& req.path === '/api/blog/list') {

        const loginResult = loginCheck(req);
        if (loginResult) {
            return loginCheck(req);
        }

        const { author = '', keyword = '' } = req.query;
        const listResult = getListData(author, keyword);
        return listResult.then(listData => {
            return new SuccessModel(listData, '成功');
        })
    }
    //详情接口
    if (method === 'GET'&& req.path === '/api/blog/detail') {
        const loginResult = loginCheck(req);
        if (loginResult) {
            return loginCheck(req);
        }
        const { id = '' } = req.query;
        const detailResult = getDetailData(id);
        return detailResult.then(detailData => {
            if (detailData) {
                return new SuccessModel(detailData)
            } else {
                return new ErrModel(null, '接口报错')
            }
        })
    }
    //新增博客接口
    if (method === 'POST'&& req.path === '/api/blog/add') {
        const loginResult = loginCheck(req);
        if (loginResult) {
            return loginCheck(req);
        }
        req.body.author = req.session.username;
        const result = blogNew(req.body);
        return result.then(data => {
            return new SuccessModel(data);
        })
    }
    //更新博客接口
    if (method === 'POST'&& req.path === '/api/blog/edit') {
        const loginResult = loginCheck(req);
        if (loginResult) {
            return loginCheck(req);
        }
        req.body.author = req.session.username;
        const result = blogUpdate(req.body);
        return result.then(data => {
            if (data) {
                return new SuccessModel('成功')
            } else {
                return new ErrModel('失败')
            }
        })
    }
    //删除博客
    if (method === 'POST'&& req.path === '/api/blog/del') {
        const loginResult = loginCheck(req);
        if (loginResult) {
            return loginCheck(req);
        }
        const result = blogDelete(req.body);
        return result.then(data => {
            if (result) {
                return new SuccessModel('成功')
            } else {
                return new ErrModel('失败')
            }
        })
    }
}

module.exports = handleBlogRouter;