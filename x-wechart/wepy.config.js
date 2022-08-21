const path = require('path')
const LessPluginAutoPrefix = require('less-plugin-autoprefix')
const prod = process.env.NODE_ENV === 'production'
// API 基础地址
const apiProduct = 'https://xtw.hisense.com/front'
// const apiDev = 'http://b2b-front-cis.devapps.hisense.com'
// const apiDev = 'http://xtwdev.devapps.hisense.com/front'

// 测试环境
const apiDev = 'http://xtwtest.hisense.com/dev'
// 预发环境
// const apiDev = 'http://xtwtest.hisense.com/front'

// 图片基础地址
const imgProductSrc = 'https://3s-static.hisense.com'
const imgDevSrc = 'http://nginx-proxy-cis.devapps.hisense.com'

const dmsApiProduct = 'https://xtw.hisense.com/dms'
// const dmsApiDev = 'http://dmstest.hisense.com'
const dmsApiDev = 'https://xtwtest.hisense.com/dms' // 临时外网可访问路径

// const ctsApiProduct = 'https://ctstest.hisense.com/'
// const ctsApiDev = 'https://ctstest.hisense.com/'
// const ctsApiProduct = 'http://api-gw-test.devapps.hisense.com/'
// const ctsApiDev = 'http://api-gw-test.devapps.hisense.com/'
const ctsApiDev = 'http://b2b-front-cis.devapps.hisense.com'
const ctsApiProduct = 'https://xtw.hisense.com/front'

// 财务接口地址
const financeApiProduct = 'https://cwpt.hisense.com/pt'
// const financeApiDev = 'http://rap2api.taobao.org'
const financeApiDev = 'http://hmptest.fssc.hisense.com/tspt'

//腾讯地图key, 腾讯地图api有说明步骤
const qqMapKey = 'YPNBZ-SO535-OODI3-QDM5Y-LCGMT-PFFQ4'
module.exports = {
  wpyExt: '.wpy',
  eslint: true,
  cliLogs: !prod,
  build: {
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
      '@vant': path.join(__dirname, 'src/components/vant')
    },
    aliasFields: ['wepy', 'weapp'],
    modules: ['node_modules']
  },
  compilers: {
    less: {
      compress: prod,
      plugins: [new LessPluginAutoPrefix({browsers: ['Android >= 2.3', 'Chrome > 53', 'iOS >= 8']})]
    },

    babel: {
      sourceMap: true,
      presets: [
        'env'
      ],
      plugins: [
        'transform-class-properties',
        'transform-decorators-legacy',
        'transform-object-rest-spread',
        'transform-export-extensions',
        'ramda'
      ]
    }
  },
  plugins: {},
  appConfig: {
    qqMapKey: qqMapKey,
    noPromiseAPI: ['createSelectorQuery'],
    // TODO:线上环境还要调试把下面注释打开
    baseUrl: apiDev,
    dmsBaseUrl: dmsApiDev,
    imgUrl: imgProductSrc,
    financeBaseUrl: financeApiDev,
    ctsBaseUrl: ctsApiDev
    // baseUrl: process.env.NODE_ENV === 'production' ? apiProduct : apiDev,
    // dmsBaseUrl: process.env.NODE_ENV === 'production' ? dmsApiProduct : dmsApiDev,
    // imgUrl: process.env.NODE_ENV === 'production' ? imgProductSrc : imgDevSrc,
    // financeBaseUrl: process.env.NODE_ENV === 'production' ? financeApiProduct : financeApiDev,
    // ctsBaseUrl: process.env.NODE_ENV === 'production' ? ctsApiProduct : ctsApiDev
  }
}

if (prod) {
  // 压缩sass
  // module.exports.compilers['sass'] = {outputStyle: 'compressed'}
  // delete module.exports.compilers.babel.sourcesMap;
  // module.exports.cliLogs = false;
  // 压缩js
  module.exports.plugins = {
    uglifyjs: {
      filter: /\.js$/,
      config: {
      }
    },
    imagemin: {
      filter: /\.(jpg|png|jpeg)$/,
      config: {
        jpg: {
          quality: 80
        },
        png: {
          quality: 80
        }
      }
    }
  }
}
