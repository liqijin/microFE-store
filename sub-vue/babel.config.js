const plugins = []

// 生产环境移除 console
if (process.env.NODE_ENV === 'production') {
  plugins.push(['transform-remove-console', { exclude: ['error', 'warn'] }])
} else {
  plugins.push('dynamic-import-node') // 热更新较慢时，可以打开
}

module.exports = {
  plugins: plugins,
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        corejs: 3
      }
    ],
    ['@vue/cli-plugin-babel/preset']
  ]
}
