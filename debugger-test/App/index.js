const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, {'content-type': 'text/html'});
    res.end('<h2>hello world</h2>')
})

server.listen(3000, () => {
    console.log('listen on 3000')
})