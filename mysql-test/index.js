const mysql = require('mysql');

const con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Wangyu001',
    port: '3306',
    database: 'myblog'
})

con.connect();

// const sql = `update blogs set title='biaotiBBB' where author='lisi'`;
const sql = `insert into blogs (title, content, createtime, author) values ('标题C', '内容C', 1591628222726, 'wangwu')`;

con.query(sql, (err, data) => {
    if (err) {
        console.error(err);
        return
    }
    console.log(data);
})

con.end();