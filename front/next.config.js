const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

module.exports = withBundleAnalyzer({
  compress: true,
  webpack(config, { webpack }) {
    // 함수를 넣어 줄  수 있다.
    const prod = process.env.NODE_ENV === 'production';
    const plugins = [...config.plugins]; // 플러그인 설정

    return {
      ...config,
      mode: prod ? 'production' : 'development',
      devtool: prod ? 'hidden-source-map' : 'eval',
      plugins
    };
  }
});
