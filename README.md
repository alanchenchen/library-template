# library-template
A template with rollup for building npm library
> Author：Alan Chen

> version: 1.2.0

> date: 2020/2/20

> 模板集成了插件打包，一键配置package.json和mocha测试等功能

## Feature
* 提供完善的rollup打包配置文件，目前支持vue、react、svelte等框架插件和js、ts纯插件的打包。
* 提供一键配置包名和具体配置等功能，配置入口在config目录的lib.config.yml。
* 一键配置支持命令行参数操作，有常用的4个命令行参数。
* 支持mocha测试，提供了trasvi-ci配置文件。

## Directory tree
``` bash
    ├─cli
    ├─config
    ├─dist
    └─src
    └─test
```
1. config文件夹是一键配置package.json的代码，lib.config.yml是配置入口，缓存文件会存cli文件夹内。
2. src文件夹内必须要存在index.ts，作为rollup打包的入口。
3. dist文件夹内是最终打包生成的js文件，bundle名称在config里配置。
4. test文件夹存放的是测试文件，约定测试文件必须满足`*.test.js`，即必须以`.test.js`后缀名结尾。

## Usage
* 通过我仓库内的[alan-cli](https://github.com/alanchenchen/alan-cli)来使用，非常便捷！
* `yarn` or `npm install` 安装依赖
* `yarn run config` or `npm run config` 一键配置package.json，一般为如下操作顺序：
    1. `yarn run config g` or `npm run config g` 生成package.json缓存文件，注意这只是个临时文件，不会覆盖源package.json，可以通过`yarn run config rm`删除。
    2. `yarn run config d` or `npm run config d` 部署package.json缓存文件，会覆盖package.json，并且删除缓存文件。
* `npm run build` 打包src内的index.js。
* `npm publish` 登陆npm账号，然后发布npm包。

## Unit test
* clone仓库
* 在test目录新增以`.test.ts`后缀名结尾的文件，编写符合mocha框架的测试用例，可以编写单元测试用例。
* 可以在travis-ci官网开启github对应仓库的自动化脚本。

## Attentions
1. 由于很多rollup-ts插件目前存在很多问题，所以导致当前模版对vue、svelte框架打包和纯ts逻辑打包采用了不同的插件。目前有一个弊端，当你打包框架插件时，ts文件是不会自动生产type文件，而且一定要通过alan-cli初始化项目，在初始化最后一个提问中选择是否打包框架插件。如果你不使用`alan-cli`，则需要在package.json里加入一个`useFrame`的字段，具体逻辑移步`template.hooks.js`。
2. 一定要善用`yarn run config`命令，不熟悉参数，可以通过`yarn run config`或者`yarn run config h`来查看使用说明。
3. `yarn run config` 命令参数如下
``` 
    Usage:

        g  generate the temporary.json, if there is already one it will be overlapped
        rm  remove the temporary.json
        d  apply the temporary.json to root path
        h  show the config command help
```
4. 最好不要手动更改源package.json，如果一定要修改，只能添加key字段，不要删除。否则一键配置会出错。

