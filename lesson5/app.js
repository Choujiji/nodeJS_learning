const async = require('async')

var concurrencyCount = 0
var fetchUrl = function (url, callback) {
    // 2000ms内的随机整数作为延时
    const delay = parseInt((Math.random() * 10000000) % 2000)
    concurrencyCount += 1
    console.log(`当前并发数：${concurrencyCount}, url为：${url}，耗时${delay}毫秒`)
    setTimeout(() => {
        // 模拟调用结束
        concurrencyCount -= 1
        callback(null, url + ' html content')
    }, delay)
}

var urls = []
for (var i = 0; i < 30; i++) {
    urls.push(`http://datasoure_${i}`)
}
// console.log(urls)

async.mapLimit(
    urls, 
    5, // 同时并发数
    (url, callback) => {    // 每个调用的回调
        fetchUrl(url, callback)
    },
    (err, result) => {  // 全部完成后调用的回调
        console.log('final:')
        console.log(result)
    }
)