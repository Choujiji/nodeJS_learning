const express = require('express')
const utility = require('utility')


const app = express() // express实例

app.get('/', (req, res) => {
    const q = req.query.q
    if (!q) {
        res.send('missing query param: q')
    }
    // const md5Value = utility.md5(q)
    // res.send(md5Value)
    const sha1Value = utility.sha1(q)
    res.send(sha1Value)
})

app.listen(3000, () => {
    console.log('3000接口正在监听~~')
})