module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
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
      ['@babel/plugin-transform-class-properties', { loose: true }],
      ['@babel/plugin-transform-private-methods', { loose: true }],
      ['@babel/plugin-transform-private-property-in-object', { loose: true }]
  ]
};
