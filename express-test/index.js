const express = require('./like-express/index');
const createError = require('http-errors');
const app = express();


app.use((req, res, next) => {
    console.log('use1');
    next()
})

app.use((req, res, next) => {
    console.log('use2');
    next();
})

app.use('/api', (req, res, next) => {
    console.log('use api');
    // res.json('use api')
    next();
})
app.get('/api', (req, res, next) => {
    console.log('get1');
    // res.json('get1')
    next();
})

app.post('/api', (req, res, next) => {
    console.log('post1');
    // res.json('post1');
    next();
})

app.get('/api/express-test', (req, res, next) => {
    res.json('get2')
    console.log('get2');
    next()
})

app.post('/api/express-test', (req, res, next) => {
    console.log('post2');
    res.json('post2');
    next();
})

// app.use(function(req, res, next) {
//     next(createError(404));
// });

app.listen(3003, () => {
    console.log('listen on port 3003')
})