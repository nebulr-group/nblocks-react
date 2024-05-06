import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

const packageJson = require("./package.json");

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: 'umd',
        name: packageJson.module
      },
    ],
    plugins: [
      typescript({ 
        tsconfig: "./tsconfig.json" 
      }),
      terser()
    ],
    external: [
      "react", 
      "react-dom", 
      "@nebulr-group/nblocks-ts-client"
    ],
  },
];