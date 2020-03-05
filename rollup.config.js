import { terser } from "rollup-plugin-terser";
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/main.js',
  output: [
    {
      file: 'build/index.cjs.js',
      format: 'cjs'
    },
    {
      file: 'build/index.esm.js',
      format: 'esm'
    }
  ],
  plugins: [
    commonjs(),
   // resolve(),    
    terser()
  ],
};