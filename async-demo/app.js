const fs = require('fs');
const path = require('path');

const getFillFn = (file) => {
    const fillPathname = path.resolve(__dirname, 'files', file);
    return new Promise((resolve, reject) => {
        fs.readFile(fillPathname, (err, data) => {
            if (err) {
                reject(err);
                return
            }
            resolve(
                JSON.parse(data.toString())
            )
        })
    })
}

const fn = async () => {
    const aData = await getFillFn('a.json');
    console.log(aData);
    const bData = await getFillFn(aData.next);
    console.log(bData);
    const cData = await getFillFn(bData.next);
    console.log(cData);
}

fn()