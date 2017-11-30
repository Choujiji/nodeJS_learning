const express = require('express')
const session = require('express-session')
const redisStore = require('connect-redis')(session)

const app = express()
app.listen(5000)

// 配置session中间件
app.use(session({
    secret: 'aeqwwdasdadddqwwesse', // 128位随机值
    resave: false,
    saveUninitialized: true,

    store: new redisStore()
}))

app.get('/', (req, res) => {
    console.log(req.session)
    
    if (req.session.isVisit) {
        req.session.isVisit += 1
        res.send(`<p>第${req.session.isVisit}次访问</p>`)
    } else {
        req.session.isVisit = 1
        res.send(`欢迎新人~`)
    }
})