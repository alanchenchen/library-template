import svelte from "rollup-plugin-svelte";
import vue from "rollup-plugin-vue";
import css from "rollup-plugin-css-only";
import resolve from "rollup-plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import filesize from "rollup-plugin-filesize";
import progress from "rollup-plugin-progress";
import commonjs from "rollup-plugin-commonjs";

import pkg from "./package.json";

/**
 * 因为ts的很多插件对svelte、vue框架兼容报错，只有rollup-plugin-typescript兼容。
 * 但是只有@wessberg/rollup-plugin-ts会生成对应的type文件。
 * 所以对于不同的npm包，采用不同的ts来打包，当开发纯js逻辑的包时，生成type文件，点当开发框架的包时，只兼容打包，不生成type文件。
 */
let ts;
if (pkg.useFrame === true) {
    ts = require("rollup-plugin-typescript");
} else {
    ts = require("@wessberg/rollup-plugin-ts")
}

const name = pkg.name
    .replace(/^(@\S+\/)?(svelte-)?(\S+)/, "$3")
    .replace(/^\w/, m => m.toUpperCase())
    .replace(/-\w/g, m => m[1].toUpperCase());

export default {
    input: "src/index.ts",
    output: [
        { file: `${pkg.module}`, format: "es" },
        { file: `${pkg.main}`, format: "umd", name }
    ],
    external: ["vue"],
    plugins: [
        ts(),
        svelte({
            emitCss: true,
            // css: (css) => {
            //     console.log(css.code);
            // }
        }),
        resolve(),
        commonjs(),
        css(),
        vue({
            exclude: ["node_modules"],
            css: false
        }),
        terser(),
        progress(),
        filesize()
    ]
};