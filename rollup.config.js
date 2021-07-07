/**
 * @type {import("rollup").RollupOptions}
 */

import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import autoExternals from "rollup-plugin-auto-external";
import shebang from "rollup-plugin-preserve-shebang";
import { terser } from "rollup-plugin-terser";

const plugins = {
  externals: autoExternals(),
  shebang: shebang(),
  json: json(),
  commonjs: commonjs({ extensions: [".js", ".ts"] }),
  nodeResolve: nodeResolve({ mainFields: ["module", "jsnext"] }),
  typescript: typescript({
    tsconfig: "tsconfig-build.json",
    sourceMap: true,
    inlineSources: true,
  }),
  babel: babel({ babelHelpers: "bundled" }),
  terser: terser(),
};

const settings = ({ name, format, plugins }) => ({
  input: `./src/${name}.ts`,
  output: {
    file: `./lib/${name}.${format === "esm" ? "js" : "cjs"}`,
    format,
    sourcemap: true,
    exports: "named",
  },
  plugins,
});

export default [
  settings({
    name: "cli",
    format: "esm",
    plugins: [
      plugins.shebang,
      plugins.externals,
      plugins.json,
      plugins.typescript,
      plugins.commonjs,
      plugins.nodeResolve,
      plugins.babel,
    ],
  }),
  settings({
    name: "index",
    format: "esm",
    plugins: [
      plugins.externals,
      plugins.typescript,
      plugins.commonjs,
      plugins.nodeResolve,
      plugins.babel,
    ],
  }),
  settings({
    name: "index",
    format: "cjs",
    plugins: [
      plugins.externals,
      plugins.typescript,
      plugins.commonjs,
      plugins.nodeResolve,
      plugins.babel,
    ],
  }),
];
