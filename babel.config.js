module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
    // ... other plugins you might have
    'react-native-reanimated/plugin', // THIS MUST BE THE LAST PLUGIN
  ],
  };
};