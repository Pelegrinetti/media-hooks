/* eslint-disable import/no-extraneous-dependencies */
import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';
import pkg from './package.json';

const bundle = (config) => ({
  ...config,
  input: 'src/index.ts',
  external: (id) => !/^[./]/.test(id)
});

export default [
  bundle({
    plugins: [esbuild()],
    output: [
      {
        dir: 'lib',
        format: 'es',
        preserveModules: true,
        sourcemap: true
      }
    ]
  }),
  bundle({
    plugins: [dts()],
    output: {
      file: pkg.typings,
      format: ' '
    }
  })
];
