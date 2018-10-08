import Taro, { Component } from '@tarojs/taro'
import { View, Button, Input } from '@tarojs/components'
import './work.less'
// import store from '../../store'
import { tipText } from '../../api/tool.js'
import { getworklist, creatework } from '../../api/work.js'

export default class Worklist extends Component {
  constructor () {
    this.state = {
      worklist: [],
      worknameinput: ''
    }
  }
  componentDidMount () {
    this.getWorkList()
  }

  componentDidShow () { 
    this.updateStore()
  }

  getWorkList () {
    getworklist((err1, list) => {
      if (!err1) {
        this.setState({
          worklist: list
        })
      }
    })
  }

  inputWorkName (e) {
    this.setState({
      worknameinput: e.detail.value
    })
  }

  submitCreate () {
    if (!this.state.worknameinput) {
      return tipText('请输入工地名称')
    }
    if (this.state.worklist.length >= 20) {
      return tipText('一个人最多创建20个工地')
    }
    wx.showLoading()
    creatework({
      name: this.state.worknameinput
    }, (err) => {
      wx.hideLoading()
      if (err) {
        return tipText(err)
      }
      this.setState({
        worknameinput: ''
      })
      this.getWorkList()
    })
  }

  linkWorkPlace (id) {
    wx.navigateTo({
      url: '/pages/workplace/index?id=' + id
    })
  }

  render () {
    let list = null
    if (this.state.worklist.length) {
      list = this.state.worklist.map(m => <View className='item' onClick={this.linkWorkPlace.bind(this, m._id)} key={m.name}>{m.name}</View>)
    } else {
      list = <View>暂无工地数据哦~</View>
    }
    return (
      <View className='worklist'>
        <View className='tit'>我的工地</View>
        {list}
        <Input value={this.state.worknameinput} type='text' className='name' placeholder='请输入工地名称' onInput={this.inputWorkName}></Input>
        <Button className='create_work' onClick={this.submitCreate}>创建工地</Button>       
      </View>
    )
  }
}

