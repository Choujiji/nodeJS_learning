const express = require('express')
const cheerio = require('cheerio')
const superagent = require('superagent')

const app = express()

app.get('/', (request, response) => {
    superagent.get('https://cnodejs.org/')
        .end((err, sres) => {
            if (err) {
                return next(err)
            }
            // sres.text内部为html所有内容
            const $ = cheerio.load(sres.text)
            // console.log($)
            const items = []
            $('#topic_list .topic_title').each((index, element) => {
                const $element = $(element)
                items.push({
                    title: $element.attr('title'),
                    href: $element.attr('href')
                })
            })

            // $('#topic_list .user_avatar pull-left').
            response.send(items)
        })
})

app.listen(3000, () => {
    console.log('start listening 3000...')
})