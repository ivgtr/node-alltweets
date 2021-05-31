import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import autoExternal from "rollup-plugin-auto-external";
import shebang from "rollup-plugin-preserve-shebang";
import { terser } from "rollup-plugin-terser";

const settings = ({ name, format }) => ({
  input: `./src/${name}.ts`,
  output: {
    file: `./lib/${name}.${format === "cjs" ? "cjs" : "js"}`,
    format,
  },
  plugins: [
    autoExternal(),
    shebang(),
    typescript(),
    nodeResolve({ mainFields: ["module", "jsnext"] }),
    commonjs({ extensions: [".js", ".ts"] }),
    json(),
    babel(),
    terser(),
  ],
});

export default [
  settings({ name: "index", format: "esm" }),
  settings({ name: "cli", format: "cjs" }),
];
