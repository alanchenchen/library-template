const assert = require("assert");

/**
 * @description mocha的测试用例，此处用的node自带的断言模块assert
 */
describe('normal module', function() {
    it('module version should be 1.1.0', function() {
        const v = require("../package.json").version
        assert.equal(v, '1.2.0')
    });
})