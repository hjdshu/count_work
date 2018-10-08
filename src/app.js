import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'
import './app.less'

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/me/index',
      'pages/workplace/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: '#8a8da4',
      selectedColor: '#1296db',
      backgroundColor: '#ffffff',
      borderStyle: 'black',
      list: [
        {
          'pagePath': 'pages/index/index',
          'text': '首页',
          'iconPath': './static/index_.png',
          'selectedIconPath': './static/index.png'
        },
        
        {
          'pagePath': 'pages/me/index',
          'text': '我',
          'iconPath': './static/me_.png',
          'selectedIconPath': './static/me.png'
        }
      ]
    }

  }

  componentDidMount () {
    wx.cloud.init({
      env: 'test-690ca9'
    })
    // wx.cloud.init({
    //   env: 'online-5a1508'
    // })
    wx.showShareMenu()
  }

  componentDidShow () {}

  componentDidHide () {}

  componentCatchError () {}

  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
