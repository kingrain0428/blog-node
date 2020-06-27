const http = require('http');
let _this;
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


class LikeKoa {
    constructor() {
        this.middlewareList = [];
        _this = this;
    }

    use (fn)  {
         _this.middlewareList.push(fn);
        return  _this
    }

    createContent (req, res)  {
        const ctx = {req, res};
        return ctx;
    }

    handleFn (ctx, fn)  {
        return fn(ctx);
    }

    handleServer (req, res)  {
        const fn = compose( _this.middlewareList)
        const ctx =  _this.createContent(req, res);
        return  _this.handleFn(ctx, fn)
    }

    listen (...args)  {
        const server = http.createServer(_this.handleServer);
        server.listen(...args)
    }
}

module.exports = LikeKoa