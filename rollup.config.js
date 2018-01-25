import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

export default {
  input: 'src/index.js',
  output: {
    name: 'fetch',
    format: 'es',
    file: 'dist/index.js',
  },
  plugins: [
    babel({
      exclude: '/node_modules/**'
    }),
    uglify()
  ]
};