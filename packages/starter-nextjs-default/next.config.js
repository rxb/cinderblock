const path = require('path');
const fs = require('fs');

module.exports = {
  transpilePackages: ['@cinderblock/design-system', 'react-native-media-query', 'react-native-web'],

  webpack: (config, options) => {
    // (a) The edge runtime (middleware) must keep Next's own react resolution.
    // Aliasing react below breaks the react-server export condition and kills
    // middleware (Clerk's clerkMiddleware, for example) with:
    //   "The 'react' package in this environment is not configured correctly"
    if (options.nextRuntime === 'edge') {
      return config;
    }

    // (b) no fs on client and that's ok
    config.resolve.fallback = { fs: false };

    // (c) Only needed when consuming the design system via a file:/link dep:
    // keeps module paths inside node_modules so transpilePackages matches and
    // walk-up resolution uses the consumer's node_modules.
    config.resolve.symlinks = false;

    // (d) RNW convention
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native$': 'react-native-web'
    };

    // (e) Force single copies of packages with SHARED STATE only.
    // ⚠️ Do NOT add stateless deps (uuid, dayjs, react-feather, validator...)
    // to this list: webpack path aliases bypass the package `exports` field,
    // which hard-breaks exports-only packages (uuid >= 11 has "main": null).
    // Stateless deps resolve fine via normal walk-up resolution.
    const singletons = ['react', 'react-dom', 'prop-types', 'react-native-web', 'react-native-media-query'];
    singletons.forEach((item) => {
      const resolved = path.resolve(__dirname, 'node_modules', item);
      if (fs.existsSync(resolved)) {
        config.resolve.alias[item] = resolved;
      }
    });

    config.resolve.extensions = ['.web.js', '.js', ...config.resolve.extensions];

    return config;
  }
};
