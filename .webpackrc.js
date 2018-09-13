const path = require('path');
export default {
  entry: 'src/index.js',
  extraBabelPlugins: [['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]],
  env: {
    development: {
      extraBabelPlugins: ['dva-hmr'],
    },
  },
  externals: {
    '@antv/data-set': 'DataSet',
    bizcharts: 'BizCharts',
    rollbar: 'rollbar',
  },
  alias: {
    components: path.resolve(__dirname, 'src/components/'),
  },
  ignoreMomentLocale: true,
  theme: './src/theme.js',
  html: {
    template: './src/index.ejs',
  },
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableDynamicImport: true,
  publicPath: '/',
  hash: true,
//	'proxy': {
//  "/api": {
//    "target": "http://192.168.2.175:8088/",
//    "changeOrigin": true,
//    "pathRewrite": { "^/api" : "" }
//  }
//	}
	//玉林
//		'proxy': {
//    "/api": {
//      "target": "http://192.168.2.195:8088/",
//      "changeOrigin": true,
//      "pathRewrite": { "^/api" : "" }
//    }
//  }
//成成
};
