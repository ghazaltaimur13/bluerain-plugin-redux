import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import camelCase from 'lodash.camelcase';

// tslint:disable-next-line:no-var-requires
const pkg = require('./package.json');

const libraryName = 'bluerain-plugin-redux';

export default {
  entry: `compiled/${libraryName}.js`,
  targets: [
    { dest: pkg.main, moduleName: camelCase(libraryName), format: 'umd' },
    { dest: pkg.module, format: 'es' },
  ],
  sourcemap: true,
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: ['react', '@blueeast/bluerain-os'],
  watch: {
    include: 'compiled/**',
  },
  plugins: [
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs({
			namedExports: {
				// left-hand side can be an absolute path, a path
				// relative to the current directory, or the name
				// of a module in node_modules
				'node_modules/react/index.js': [ 'Children', 'Component', 'createElement' ]
			}
		}),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve(),

    // Resolve source maps to the original source
    sourceMaps(),
  ],
};
