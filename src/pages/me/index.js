import Taro, { Component } from '@tarojs/taro'
import { View, Image, Input, Button } from '@tarojs/components'
import './index.less'
import createUser from '../../api/user'
import { getUserList, createWorker } from '../../api/teamer'
import { tipText } from '../../api/tool'
import store from '../../store'

export default class Index extends Component {
  constructor () {
    this.state = {
      user: store.user,
      workerList: [],
      worknameinput: '',
      workphoneinput: ''
    }
  }
  config = {
    navigationBarTitleText: '我'
  }

  updateStore () {
    this.setState({
      user: store.user
    })
  }

  componentWillMount () {}

  componentDidMount () { 
    this.getWorkUserList()
  }

  componentWillUnmount () {}

  componentDidShow () {
    this.updateStore()
  }

  componentDidHide () {}

  getWorkUserList () {
    getUserList((err, data) => {
      if (!err) {
        this.setState({
          workerList: data
        })
      }
    })
  }

  inputWorkName (e) {
    this.setState({
      worknameinput: e.detail.value
    })
  }

  inputWorkPhone (e) {
    this.setState({
      workphoneinput: e.detail.value
    })
  }

  submitCreate () {
    if (!this.state.worknameinput) {
      return tipText('请输入工人姓名')
    }
    if (this.state.workerList.length >= 50) {
      return tipText('一个人最多创建50个工人')
    }
    wx.showLoading()
    createWorker({
      name: this.state.worknameinput,
      phone: this.state.workphoneinput
    }, (err) => {
      wx.hideLoading()
      if (err) {
        return tipText(err)
      }
      this.setState({
        worknameinput: '',
        workphoneinput: ''
      })
      this.getWorkUserList()
    })
  }

  // 获取用户昵称
  getUserAvaNick (e) {
    let detail = e.detail
    if (detail.errMsg !== 'getUserInfo:ok') {
      return
    }
    wx.showLoading()
    createUser(this.state.user._openid, detail.userInfo, (err, result) => { 
      wx.hideLoading()
      store.user = result
      this.setState({
        user: result
      })
    })
  }

  render () {
    let list = null
    if (this.state.workerList.length) {
      list = this.state.workerList.map(m => <View className='item' key={m.name}>{m.name}</View>)
    } else {
      list = <View>暂无工人数据哦~</View>
    }
    return (
      <View className='me'>
        <View className='top'>
          <Image className='portrait' src={this.state.user.userInfo.avatarUrl}></Image>
          <View className='nick'>{this.state.user.userInfo.nickName}</View>

          {
            this.state.user.userInfo && this.state.user.userInfo.nickName ? null : <View className='nick'>未授权昵称头像</View>
          }

          <Button className='user' openType='getUserInfo' onGetUserInfo={this.getUserAvaNick}>更新头像昵称</Button>
        </View>

        <View className='user-list'>
          <View className='title'>我的工人队伍</View>
          <View className='list'>
            {list}
          </View>

          <Input value={this.state.worknameinput} type='text' className='name' placeholder='请输入工人姓名' onInput={this.inputWorkName}></Input>
          <Input value={this.state.workphoneinput} type='text' className='phone' placeholder='请输入工人手机号' onInput={this.inputWorkPhone}></Input>
          <Button className='create_work' onClick={this.submitCreate}>创建工人</Button>       
        </View>
      
      </View>
    )
  }
}

