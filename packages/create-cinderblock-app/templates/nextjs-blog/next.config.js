const path = require('path');
const fs = require('fs');

module.exports = {
  transpilePackages: [
    '@cinderblock/design-system',
    'expo',
    'expo-image',
    'expo-modules-core',
    'react-native-media-query',
    'react-native-web'
  ],

  webpack: (config, options) => {
    if (options.nextRuntime === 'edge') {
      return config;
    }

    config.plugins.push(
      new options.webpack.DefinePlugin({
        __DEV__: JSON.stringify(options.dev)
      })
    );

    config.resolve.fallback = { fs: false };
    config.resolve.symlinks = false;

    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native$': 'react-native-web'
    };

    const singletons = [
      'react',
      'react-dom',
      'prop-types',
      'react-native-web',
      'react-native-media-query'
    ];
    singletons.forEach((item) => {
      const resolved = path.resolve(__dirname, 'node_modules', item);
      if (fs.existsSync(resolved)) {
        config.resolve.alias[item] = resolved;
      }
    });

    config.resolve.extensions = [
      '.web.js',
      '.web.jsx',
      '.web.ts',
      '.web.tsx',
      '.js',
      ...config.resolve.extensions
    ];

    return config;
  }
};
