const fs = require('fs');
const path = require('path');

const fileName = path.resolve(__dirname, 'data.txt');


// fs.readFile(fileName, (err, data) => {
//     if (err) {
//         console.error(err);
//         return
//     }
//     console.log(String(data))
// })

// const content = 'xinjianeirong\n';
// const opt = {
//     flag: 'a'
// }

// fs.writeFile(fileName, content, opt, (err) => {
//     err&& console.error(err)
// })

fs.exists(fileName, exist => {
    console.log('exist', exist)
})