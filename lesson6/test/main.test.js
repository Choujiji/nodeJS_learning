const main = require('../main')
const should = require('should')

// describe描述测试主体
describe('test/main.test', () => {
    // it  是case情况
    it('当n=10时，结果应为55', () => {
        main.fibonacci(10).should.equal(55)
    })

    it('当n=1时，结果应为1', () => {
        main.fibonacci(1).should.equal(1)
    })

    it('当n=0时，结果应为0', () => {
        main.fibonacci(0).should.equal(0)
    })

    it('当n>10时，应抛出异常', () => {
        (() => {
            main.fibonacci(11)
        }).should.throw('n should <= 10')        
    })

    it('当n<0时，应抛出异常', () => {
        (() => {
            main.fibonacci(-1)
        }).should.throw('n should >= 0')
    })

    it('当n不是数字时，应抛出异常', () => {
        (() => {
            main.fibonacci('呵呵')
        }).should.throw('n should be a Number')
    })
})