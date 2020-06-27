const fs = require('fs');
const path = require('path');

//写日志
function writeLog(writeStream, log) {
    writeStream.write(log + '\n');
}

function createWriteStream (fillName) {
    const fullFileName = path.join(__dirname, '../', '../', 'logs', fillName);
    const writeStream = fs.createWriteStream(fullFileName, {
        flags: 'a'
    });
    return writeStream;
}

const accessWriteStream = createWriteStream('access.log');
function access (log) {
    writeLog(accessWriteStream, log)
}

module.exports = {
    access
}