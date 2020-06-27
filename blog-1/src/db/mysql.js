const mysql = require('mysql');

const { MYSQL_CONF } = require('../conf/db');

const con = mysql.createConnection(MYSQL_CONF);

con.connect();

function exec(sql) {
    let promise = new Promise((resolve, reject) => {
        con.query(sql, (err, data) => {
            if (err) {
                reject(err);
                return
            }
            resolve(data);
        })
    })
    return promise
}

module.exports = {
    exec
}