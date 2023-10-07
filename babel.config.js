module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@/entities': './src/entities',
          '@/widgets': './src/widgets',
          '@/features': './src/features',
          '@/shared': './src/shared',
          '@/screens': './src/screens',
          '@/app': './src/app',
        },
      },
    ],
  ],
};
