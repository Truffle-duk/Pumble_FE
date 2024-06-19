const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

const extraNodeModules = {
    '@utils': path.resolve(__dirname, 'app/utils'),
    '@components': path.resolve(__dirname, 'app/components'),
    '@screens': path.resolve(__dirname, 'app/screens'),
    '@assets': path.resolve(__dirname, 'app/assets')
};

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
    resolver: {
        extraNodeModules,
        sourceExts: ['jsx', 'js', 'ts', 'tsx', 'cjs', 'json'],
    },
    watchFolders: [
        path.resolve(__dirname, 'app/utils'),
        path.resolve(__dirname, 'app/components'),
        path.resolve(__dirname, 'app/screens'),
        path.resolve(__dirname, 'app/assets')
    ]
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);