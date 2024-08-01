const { defineConfig } = require("@vue/cli-service");
const { ProvidePlugin } = require("webpack");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    open: false, // 自动打开浏览器
    port: 8080,
    proxy: {
      '/api': {
        target: 'https://api.wisdom-br.com',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },
  // IMP START - Bundler Issues
  configureWebpack: (config) => {
    config.devtool = "source-map";
    config.resolve.symlinks = false;
    config.resolve.fallback = {
      crypto: "crypto-browserify",
      stream: "stream-browserify",
      assert: "assert",
      os: "os-browserify",
      https: "https-browserify",
      http: "stream-http",
      url: "url",
      zlib: "browserify-zlib",
    };
    config.plugins.push(new ProvidePlugin({ Buffer: ["buffer", "Buffer"] }));
    config.plugins.push(new ProvidePlugin({ process: ["process/browser"] }));
    // IMP END - Bundler Issues
    config.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: "disabled",
      })
    );
  },
});
