const http = require('http');
const qureyString = require('querystring');

const server = http.createServer((req, res) => {
    // console.log('req: ', JSON.stringify);
    const method = req.method;
    console.log('method: ', method);
    const url = req.url;
    console.log('url: ', url);
    req.query = qureyString.parse(url.split('?')[1]);
    res.end(JSON.stringify(req.query));
});

server.listen(3000, () => {
    console.log('listen on 3000 port')
})