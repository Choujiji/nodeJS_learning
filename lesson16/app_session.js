const express = require('express')
const session = require('express-session')

const app = express()
app.listen(5000)

// 配置session中间件
app.use(session({
    secret: 'aeqwwdasdadddqwwessed', // 128位随机值
    cookie: {
        maxAge: 60 * 1000
    },
    resave: false,
    saveUninitialized: true
}))

app.get('/', (req, res) => {
    if (req.session.isVisit) {
        req.session.isVisit += 1
        res.send(`<p>第${req.session.isVisit}次访问</p>`)
    } else {
        req.session.isVisit = 1
        res.send(`欢迎新人~`)
        console.log(req.session)
    }
})