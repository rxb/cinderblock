const path = require('path');



module.exports = {

  // nextjs 13 can transpile packages
  // https://beta.nextjs.org/docs/api-reference/next.config.js#transpilepackages
  transpilePackages: ['cinderblock', 'react-native-media-query', 'react-native-web'],
  
	webpack: (config, options) => {

		// no fs on client and that's ok
		config.resolve.fallback = { fs: false };

		// Transform all direct `react-native` imports to `react-native-web`
		config.resolve.alias = {
			...(config.resolve.alias || {}),
			'react-native$': 'react-native-web'
		}

		// for peer dependencies in transpiling 
		// TODO: this doesn't seem sustainable
		const peerDependencies = ['react', 'react-dom', 'prop-types', 'react-native-web', 'uuid', 'react-feather', 'body-scroll-lock', 'react-dnd', 'validator', 'dayjs', 'react-native-media-query', 'css-mediaquery'];
		peerDependencies.forEach( item => {
			config.resolve.alias[item] = path.resolve(__dirname, '.', 'node_modules', item);
		});

		config.resolve.extensions = [
			'.web.js',
			'.js',
			...config.resolve.extensions,
		]

		return config
	},
};