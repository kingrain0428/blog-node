const http = require('http');

const PORT = 5005;
const serverHandler = require('../app');

const server = http.createServer(serverHandler);

server.listen(PORT, () => {
    console.log(`listen on ${PORT} port`)
})