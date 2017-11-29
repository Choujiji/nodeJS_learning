const express = require('express')

var fibonacci = function(n) {
    if (typeof n !== 'number') {
        throw new Error('n should be a Number')
    }
    if (n < 0) {
        throw new Error('n should >= 0')
    }
    if (n > 10) {
        throw new Error('n should <= 10')
    }
    if (n === 0) {
        return 0
    }
    if (n === 1) {
        return 1
    }
    
    return fibonacci(n - 1) + fibonacci(n - 2)
}

const app = express()
app.get('/fib', (req, res) => {
    var n = Number(req.query.n)
    if (isNaN(n)) {
        console.log(n) 
        n = req.query.n
    } 
    try {
        const result = String(fibonacci(n)) // 转换为字符串（直接发数字可能会转换为http状态码）
        res.send(result)
    } catch (error) {
        res
        .status(500)
        .send(error.message)
    }
})

app.listen(3000, () => {
    console.log('开始在3000端口运行...')
})

module.exports = app
