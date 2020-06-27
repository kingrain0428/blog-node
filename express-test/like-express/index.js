const http = require('http');

let that;

class LikeExpress {
    constructor() {
        this.routers = {
            all: [],
            get: [],
            post: []
        }
        that = this;
    }

    registor (path, path2) {
        const middlemare = {};
        // console.log('registor path: ', path)
        // const path = [].shift.call(arguments);
        if (typeof path === 'string') {
            middlemare.path = path;
            middlemare.stack = [].slice.call(arguments, 1)[0]
        } else {
            middlemare.path = '/';
            middlemare.stack = [].slice.call(arguments, 0)[0]
        }
        console.log('middlemare', middlemare)
        return middlemare
    }

    use () {
        const middlemare = that.registor.apply(this, arguments);
        that.routers.all.push(middlemare)
    }

    get () {
        // console.log('get args: ', arguments)
        const middlemare = that.registor.apply(this, arguments);
        that.routers.get.push(middlemare)
    }

    post () {
        const middlemare = that.registor.apply(this, arguments);
        that.routers.post.push(middlemare)
    }

    match (method, url) {
        let stack = [];
        let curRoutes = [];
        curRoutes = curRoutes.concat(that.routers.all);
        curRoutes = curRoutes.concat(that.routers[method]);
        curRoutes.map(item => {
            if (url.indexOf(item.path) === 0) {
                stack.push(item.stack)
            }
        })
        return stack
    }

    handle (req, res, resultList) {
        console.log(resultList)
        const next = () => {
            const middlemare = resultList.shift();
            if (middlemare) {
                middlemare(req, res, next)
            }
        }
        next()
    }


    handleCallback (req, res) {
        res.json = data => {
            res.setHeader('Content-type', 'application/json');
            res.end(JSON.stringify(data))
        }
        const method = req.method.toLowerCase();
        const url = req.url;
        console.log(that.match);
        const resultList = that.match(method, url)
        that.handle(req, res, resultList)
    }

    listen (...args) {
        const server = http.createServer(that.handleCallback);
        server.listen(...args)
    }
}

module.exports = () => {
    return new LikeExpress();
};