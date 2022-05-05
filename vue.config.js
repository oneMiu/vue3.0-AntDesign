/**
 * @author chuzhixin 1204505056@qq.com
 * @description vue.config.js全局配置
 */
const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const {
  /* baseURL, */
  publicPath,
  assetsDir,
  outputDir,
  lintOnSave,
  transpileDependencies,
  title,
  abbreviation,
  devPort,
  providePlugin,
  buildZip,
} = require('./src/config')
if (process.env.NODE_ENV === 'production') {
  try {
    let packageTxt = fs.readFileSync('./package.json', 'utf8')
    let versionData = packageTxt.split('\n')
    let packageJson = JSON.parse(packageTxt)
    let VersionArr = packageJson.version.split('.')
    VersionArr[1] = parseInt(VersionArr[1]) + 1
    let versionLine = VersionArr.join('.')
    for (let i = 0; i < versionData.length; i++) {
      if (versionData[i].indexOf('"version":') != -1) {
        versionData.splice(i, 1, '  "version": "' + versionLine + '",')
        break
      }
    }
    fs.writeFileSync('./package.json', versionData.join('\n'), 'utf8')
    console.log(
      chalk.green.bold('更新版本号成功！当前最新版本号为：' + versionLine)
    )
  } catch (e) {
    console.log(chalk.red.bold('读取文件修改版本号出错:', e.toString()))
  }
}
const { version, author } = require('./package.json')
const Webpack = require('webpack')
const WebpackBar = require('webpackbar')
const FileManagerPlugin = require('filemanager-webpack-plugin')
const dayjs = require('dayjs')
const time = dayjs().format('YYYY-M-D HH:mm:ss')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['html', 'js', 'css', 'svg']
process.env.VUE_APP_TITLE = title
process.env.VUE_APP_AUTHOR = author || 'handsome'
process.env.VUE_APP_UPDATE_TIME = time
process.env.VUE_APP_VERSION = version

const resolve = (dir) => {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath,
  assetsDir,
  outputDir,
  lintOnSave,
  transpileDependencies,
  devServer: {
    hot: true,
    port: devPort,
    open: true,
    noInfo: false,
    overlay: {
      warnings: true,
      errors: true,
    },
    // 注释掉的地方是前端配置代理访问后端的示例
    // proxy: {
    //   [baseURL]: {
    //     target: `http://你的后端接口地址`,
    //     ws: true,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       ["^/" + baseURL]: "",
    //     },
    //   },
    // },
  },
  configureWebpack() {
    return {
      resolve: {
        alias: {
          '@': resolve('src'),
          '*': resolve(''),
        },
      },
      plugins: [
        new Webpack.ProvidePlugin(providePlugin),
        new WebpackBar({
          name: '',
        }),
      ],
    }
  },
  chainWebpack(config) {
    config.resolve.symlinks(true)
    config.module.rule('svg').exclude.add(resolve('src/icon/remixIcon')).end()

    config.module
      .rule('remixIcon')
      .test(/\.svg$/)
      .include.add(resolve('src/icon/remixIcon'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: 'remix-icon-[name]' })
      .end()

    config.when(process.env.NODE_ENV === 'development', (config) => {
      config.devtool('source-map')
    })

    config.when(process.env.NODE_ENV !== 'development', (config) => {
      config.performance.set('hints', false)
      config.devtool('none')
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'hahahahaha',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial',
          },
        },
      })
      config
        .plugin('banner')
        .use(Webpack.BannerPlugin, [`${time}`])
        .end()
      config
        .plugin('compression')
        .use(CompressionWebpackPlugin, [
          {
            filename: '[path]/hahaha.gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
              '\\.(' + productionGzipExtensions.join('|') + ')$'
            ),
            threshold: 8192,
            minRatio: 0.8,
          },
        ])
        .end()
    })

    if (buildZip) {
      config.when(process.env.NODE_ENV === 'production', (config) => {
        console.log(chalk.green.bold(`已开启自动打包，文件名：${abbreviation}_${version}.zip`))
        config
          .plugin('fileManager')
          .use(FileManagerPlugin, [
            {
              events: {
                onEnd: {
                  archive: [
                    {
                      source: `./${outputDir}`,
                      destination: `./dist/${abbreviation}_${version}.zip`,
                    },
                  ],
                },
              },
            },
          ])
          .end()
      })
    }
  },
  runtimeCompiler: true,
  productionSourceMap: false,
  css: {
    requireModuleExtension: true,
    sourceMap: true,
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
          modifyVars: {
            'vab-color-blue': '#1890ff',
            'vab-margin': '20px',
            'vab-padding': '20px',
            'vab-header-height': '65px',
          },
        },
      },
    },
  },
}
