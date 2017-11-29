const cheerio = require('cheerio')
const superagent = require('superagent')
const eventProxy = require('eventproxy')

const url = require('url')  // 内置模块

const rootUrl = 'https://cnodejs.org/'



superagent.get(rootUrl, (err, res) => {
    if (err) {
        return Error(err)
    }

    // 获取所有html内容，使用cheerio加载
    const htmlText = res.text
    const $ = cheerio.load(htmlText)

    const topicUrls = []
    $('#topic_list .topic_title').each((index, element) => {
        const $element = $(element)
        const subUrl = $element.attr('href')
        // 拼接sub_url为完整url
        const href = url.resolve(rootUrl, subUrl)
        topicUrls.push(href)
    })

    console.log(topicUrls)

    // 创建事件代理对象
    const ep = new eventProxy()

    const eventName = 'topic_html'

    // 注册监听，所有url请求完成后执行回调
    ep.after(eventName, topicUrls.length, (topics) => {
        // 所有请求全部完成后执行
        const infos = topics.map((topic, index) => {
            const url = topic[0]
            const html = topic[1]

            // 解析数据
            const $ = cheerio.load(html)
            return {
                title: $('.topic_full_title').text().trim(),
                href: url,
                comment1: $('.reply_content').eq(0).text().trim(),
            }
        })

        console.log('finished-------')
        console.log(infos)
    })

    // 异步请求所有topic_url的数据
    topicUrls.forEach((topicUrl, index) => {
        superagent.get(topicUrl).end((err, res) => {
            // 暂时忽略错误
            console.log(`请求地址：${topicUrl} 成功~`)
            // 发送事件（参数为url和html封装的数组）
            ep.emit(
                eventName, 
                [
                    topicUrl,
                    res.text
                ]
            )
        })
    })
})