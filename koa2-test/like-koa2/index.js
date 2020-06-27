const http = require('http');

function compose (middlewareList) {
    return function (ctx) {
        function dispatch (i) {
            const fn = middlewareList[i]
            try {
                return Promise.resolve(fn(ctx, dispatch.bind(null, i + 1)))
            } catch (err) {
                return Promise.reject(err)
            }
    
        }
        return dispatch(0)
    }
}
let _this;
class LikeKoa {
    constructor() {
        this.middlewareList = [];
        _this = this;
    }

    use(fn) {
        _this.middlewareList.push(fn);
        return _this;
    }

    createContext(request, response) {
        const ctx = {request, response};
        response.end(
            JSON.stringify(ctx.body|| '')
        )
        return ctx
    }

    handleFn(ctx, fn) {
        return fn(ctx);
    }

    callback() {
        const fn = compose(_this.middlewareList);
        return function (req, res) {
            const ctx = _this.createContext(req, res);
            return _this.handleFn(ctx, fn);
        }
    }

    listen(...args) {
        const server = http.createServer(_this.callback());
        server.listen(...args);
    }
}

module.exports = LikeKoa;