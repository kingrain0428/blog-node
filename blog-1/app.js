const queruString = require('querystring');

const { set, get } = require('./src/db/redis');

const { access } = require('./src/utils/log');

const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');

function getPostBody (req) {
    return new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({});
            return
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({});
            return
        }
        let postBody = '';
        req.on('data', chunk => {
            postBody += chunk.toString()
        });
        req.on('end', () => {
            if (!postBody) {
                resolve({});
                return
            }
            resolve(
                JSON.parse(postBody)
            )
        })
    })
}


const getExpriesFn = () => {
    const d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
    return d.toGMTString();
}

// const SESSION_DATA = {};

const serverHandler = (req, res) => {


//记录access log
    access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`)

    const url = req.url;
    req.path = url.split('?')[0];
    req.query = queruString.parse(url.split("?")[1]);

    res.setHeader('Content-type', 'application/json');

    const cookieStr = req.headers.cookie;

    req.cookie = {};

    if (cookieStr) {
        cookieStr.split(';').map((item) => {
            const arr = item.split('=');
            const key = arr[0].trim();
            const val = arr[1].trim();
            req.cookie[key] = val;
        })
    }

    // session逻辑
    // let userId = req.cookie.userid;
    // let setCookie = false;
    // if (userId) {
    //     if (!SESSION_DATA[userId]) {
    //         SESSION_DATA[userId] = {}
    //     }
    // } else {
    //     setCookie = true;
    //     userId = `${Date.now()}_${Math.random()}`;
    //     SESSION_DATA[userId] = {}
    // }

    // req.session = SESSION_DATA[userId]

    //session逻辑  redis版本
    let userId = req.cookie.userid;
    let setCookie = false;
    if (!userId) {
        setCookie = true;
        userId = `${Date.now()}_${Math.random()}`;
        // set(userId, {});
    }
    req.sessionId = userId;
    get(req.sessionId).then(getData => {
        if (getData === null) {
            set(req.sessionId, {})
            req.session = {};
        } else {
            req.session = getData
        }
        return getPostBody(req)
    }).then(postBody => {
        req.body = postBody;
        const blogResult = handleBlogRouter(req, res);
        if (blogResult) {
            blogResult.then(blogData => {
                if (setCookie) {
                    res.setHeader('Set-Cookie', `username=${data.username}; path=/; readOnly; expries=${getExpriesFn()}`)
                }
                res.end(JSON.stringify(blogData));
            })
            return
        }
        const userResult = handleUserRouter(req, res);
        if (userResult) {
            userResult.then(userData => {
                if (setCookie) {
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/; readOnly; expries=${getExpriesFn()}`)
                }
                res.end(JSON.stringify(userData));
            })
            return
        }

        res.writeHeader(404, {"Content-type": "text/plain"});
        res.write("404 Not Found\n");
        res.end();
    })
}

module.exports = serverHandler;