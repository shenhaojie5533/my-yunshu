import Vue from 'vue'
import App from './App'
// import { fetch } from '@/utils/axios.js'

Vue.config.productionTip = false
// Vue.prototype.$fetch = fetch
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: [
      '^pages/index/main',
      'pages/my/main',
      'pages/readbook/main'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '云书',
      navigationBarTextStyle: 'black'
    },
//配置tabBar
    tabBar: {
      color: "#9E9E9E",
      selectedColor: "#1296db",
      backgroundColor: "#fff",
      borderStyle: "#1296db",
      list: [
        {
          pagePath: "pages/index/main",
          text: "首页",
          iconPath: "static/img/shouye.png",
          selectedIconPath: "static/img/shouye2.png",
        },
        {
          pagePath: "pages/readbook/main",
          text: "我的阅读",
          iconPath: "static/img/书.png",
          selectedIconPath: "static/img/书2.png",
        },
        {
          pagePath: "pages/my/main",
          text: "个人中心",
          iconPath: "static/img/个人中心.png",
          selectedIconPath: "static/img/个人中心2.png",
        }
      ]
    }

  }
}
