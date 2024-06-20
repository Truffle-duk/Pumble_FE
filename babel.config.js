module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  //presets: ['module:@react-native/babel-preset'],
  plugins: [
      ['module-resolver',
        {
          root: './app',
          extensions: [
              '.jsx',
              '.js',
              '.json'
          ],
          alias: {
            '@': './app',
            '@components': './app/components',
            '@assets': './app/assets',
            '@utils': './app/utils',
            '@screens': './app/screens'
          }
        }
      ],
      ['module:react-native-dotenv', {
          moduleName: '@env',
          path: '.env',
          blocklist: null,
          allowlist: null,
          safe: false,
          allowUndefined: true,
          verbose: false,
      }]
      // ['@babel/plugin-transform-class-properties', { loose: true }],
      // ['@babel/plugin-transform-private-methods', { loose: true }],
      // ['@babel/plugin-transform-private-property-in-object', { loose: true }],
      // ["@babel/plugin-transform-flow-strip-types",
      // "@babel/plugin-proposal-class-properties",],
  ]
};
