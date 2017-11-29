const should = chai.should()    // chai在script中通过cdn插入

describe('simple test', () => {
    it('当n=0时，结果应为0', () => {
        window.fibonacci(0).should.equal(0)
    })
})