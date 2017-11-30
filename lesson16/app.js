const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()
app.listen(3000)

app.use(cookieParser()) // 使用默认的cookie

app.get('/', (req, res) => {
    if (req.cookies.isVisit) {
        console.log(req.cookies)
        res.send('欢迎回来~')
    } else {
        res.cookie(
            'isVisit', 
            1,
            {
                maxxAge: 60 * 1000
            }
        )
        res.send('新人登录~')
    }
})