const app = require('../app')
const supertest = require('supertest')
const should = require('should')

// 使用express实例（兼容connect的web框架均可）初始化supertest实例
const request = supertest(app)

const STATUS_CODE = {
    SUCCESS: 200,
    FAILED: 500
}

// 测试用例
describe('test/app.test', () => {
    // it('当n=10时，结果应为55', (done) => {
    //     request.get('/fib')
    //         .query({
    //             n: 10
    //         })
    //         .end((err, res) => {
    //             // 不应存在错误
    //             should.not.exist(err)
    //             // 返回的是字符串
    //             res.text.should.equal('55')

    //             // 触发mocha的done方法（request是异步，所以需要主动告知mocha结束）
    //             done(err)
    //         })
    // })

    it('当n=0时，结果应为0', (done) => {
        testFib(0, STATUS_CODE.SUCCESS, '0', done)
    })
    
    it('当n=1时，结果应为1', (done) => {
        testFib(1, STATUS_CODE.SUCCESS, '1', done)
    })
    
    it('当n=10时，结果应为55', (done) => {
        testFib(10, STATUS_CODE.SUCCESS, '55', done)
    })
    
    it('当n>10时，结果应抛出异常', (done) => {
        testFib(11, STATUS_CODE.FAILED, 'n should <= 10', done)
    })
    
    it('当n<0时，结果应抛出异常', (done) => {
        testFib(-1, STATUS_CODE.FAILED, 'n should >= 0', done)
    })
    
    it('当n不是数字时，结果应抛出异常', (done) => {
        testFib('呵呵', STATUS_CODE.FAILED, 'n should be a Number', done)
    })
    
    it('发生错误时，应返回500', (done) => {
        request.get('/fib')
            .query({
                n: 100
            })
            .expect(STATUS_CODE.FAILED)
            .end((err, res) => {
                done(err)
            })
    })
})

/** 统一测试方法 */
const testFib = function(n, statusCode, expect, done) {
    request.get('/fib')
        .query({
            n: n
        })
        .expect(statusCode)
        .end((err, res) => {
            should.not.exist(err)
            res.text.should.equal(expect)
            done(err)
        })
}