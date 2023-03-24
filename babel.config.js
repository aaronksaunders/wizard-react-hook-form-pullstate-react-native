// module.exports = function(api) {
//   api.cache(true);
//   return {
//     presets: ['babel-preset-expo'],
//     env: {
//       production: {
//         plugins: ['react-native-paper/babel','module:react-native-dotenv']
//       },
//       development: {
//         plugins: ['react-native-paper/babel','module:react-native-dotenv']
//       },
//     },
//   };
// };

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-paper/babel",
      [
        "dotenv-import",
        {
          moduleName: "@env",
          path: ".env",
          blocklist: null,
          allowlist: null,
          safe: false,
          allowUndefined: false,
        },
      ],
    ],
  };
};
