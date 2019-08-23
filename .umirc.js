
// ref: https://umijs.org/config/
export default {
  history: 'hash',
  treeShaking: true,
  disableCSSModules: false,
  publicPath: "./",
  outputPath: "./dist",
  targets: {
    ie: 11,
  },
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: true,
      title: 'product management',
      dll: false,
      routes: {
        exclude: [
          /components\//,
        ],
      },
    }],
  ],
}
