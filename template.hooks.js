module.exports = {
    afterInit({print}) {
        print.warn(`
    npm install or yarn 安装依赖
    npm start 启动开发环境
    npm test 本地mocha框架单元测试
    npm run build 打包代码
    npm publish --access=pubilc 发布npm包
`)
    }
}