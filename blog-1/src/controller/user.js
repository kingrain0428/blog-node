const { exec } = require('../db/mysql');
//登录接口
const loginData = (psotBody = {}) => {
    const { username = '', password = '' } = psotBody;
    // const sql = `insert into users (username, password, realname) values ('${username}', '${password}', '假装真名')`;
    const sql = `select username, realname from users where username='${username}' and password='${password}'`;
    const result = exec(sql);
    return result.then(data => {
        if (data[0]&& data[0].username) {
            return data[0]
        }
        return null;
    })
}

module.exports = {
    loginData
}