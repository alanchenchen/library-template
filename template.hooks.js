const { resolve } = require("path")

module.exports = {
    async afterInit({
        print,
        fs,
        prompt,
        configs
    }) {
        try {
            const { resourcePath } = configs;
            const targetPath = resolve(resourcePath, "./package.json");
            const clone = require(targetPath);
            let ifUseFrame;
            /**
             * 通过询问用户是否使用框架，然后给package.json写入useFrame字段.
             */
            const { useFrame } = await prompt[
                {
                    type: "list",
                    name: "useFrame",
                    message: "Do you want use framework such as vue or svelte?",
                    choices: ["yes", "no"]
                }
            ];
            if (useFrame === "yes") {
                ifUseFrame = true;
            } else if (useFrame === "no") {
                ifUseFrame = false;
            }
            clone.useFrame = ifUseFrame;

            await fs.outputFile(targetPath, JSON.stringify(clone, null, 2), "utf-8");

            print.warn(`
        npm install or yarn 安装依赖
        npm test 本地mocha框架单元测试
        npm run build 打包代码
        npm publish --access=pubilc 发布npm包
        `);
        } catch (error) {
            print.error(error);
        }
    }
}