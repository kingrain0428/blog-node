const { loginData } = require('../controller/user');
const { SuccessModel, ErrModel } = require('../model/resModel');

const { set } = require('../db/redis');

const handleUserRouter = (req, res) => {
    const method = req.method;
    if (method === 'POST'&& req.path === '/api/user/login') {
        const result = loginData(req.body);
        // const result = loginData(req.query);
        return result.then(data => {
            if (data) {
                req.session.username = data.username;
                req.session.realname = data.realname;

                set(req.sessionId, req.session)

                return new SuccessModel(req.session, '登录成功')
            } else {
                return new ErrModel('登录失败')
            }
        })
    }

    if (method === 'GET'&& req.path === '/api/user/test') {
        if (req.session.username) {
            return Promise.resolve(new SuccessModel({
                session: req.session
            }, '登陆成功'))
        } else {
            return Promise.resolve(new ErrModel('登录失败'))
        }
    }
}

module.exports = handleUserRouter;