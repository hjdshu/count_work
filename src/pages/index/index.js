import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { Worklist } from './worklist'
import './index.less'
import { getUserInfoBase } from '../../api/index.js'
import store from '../../store'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '首页'
  }
  constructor () {
    this.state = {
      user: store.user
    }
  }
  componentDidMount () {
    wx.showLoading()
    getUserInfoBase((err, res) => {
      store.user = res
      this.updateStore()
      wx.hideLoading()
    })
  }
  componentDidShow () { 
    this.updateStore()
  }
  linkToMe () {
    Taro.navigateTo({
      url: '/pages/me/index'
    })
  }
  updateStore () {
    this.setState({
      user: store.user
    })
  }

  render () {
    let IMG = null
    if (this.state.user.userInfo && this.state.user.userInfo.avatarUrl) {
      IMG = <Image className='portrait' src={this.state.user.userInfo.avatarUrl}></Image>
    }
    
    // let LOG = null
    // if (!this.state.user.userInfo || !this.state.user.userInfo.avatarUrl) {
    //   LOG = <Button className='user' openType='getUserInfo' onGetUserInfo={this.getUserAvaNick}>授权头像</Button>
    // }

    // let LOG = <Button className='user' openType='getUserInfo' onGetUserInfo={this.getUserAvaNick}>授权头像</Button>
    return (
      <View className='index'>
        {/* <View>用户身份: {this.state.user._openid}</View> */}
        <View>用户ID: {this.state.user._id}</View>
        {IMG}
        {/* {LOG} */}
        <Worklist name='工地'></Worklist>
      </View>
    )
  }
}

