import Taro, { Component } from '@tarojs/taro'
import { View} from '@tarojs/components'
import './index.less'
import { getUserList, getWorkmanlist} from '../../api/work'
// import { tipText } from '../../api/tool'
// import store from '../../store'

export default class Index extends Component {
  constructor () {
    this.state = {
      list: [],
      id: '',
      workerList: []
    }
  }
  config = {
    navigationBarTitleText: '工地'
  }

  updateStore () {
  }

  componentWillMount () {
  }

  componentDidMount () {
    this.setState({
      id: this.$router.params.id
    })
    this.getList()
  }

  componentWillUnmount () {}

  componentDidShow () {
    this.updateStore()
  }

  getList () {
    getWorkmanlist({
      work_id: this.state.id
    }, (err, data) => {
      console.log(this.state.id, data)
      if (!err) {
        this.setState({
          list: data
        })
      }
    })
  }

  getWorkUserList () {
    getUserList((err, data) => {
      if (!err) {
        this.setState({
          workerList: data
        })
      }
    })
  }

  componentDidHide () {}

  render () {
    let listDom = null
    if (this.state.list.length) {
      listDom = this.state.list.map(m => <View className='item' key={m.name}>{m.name}</View>)
    } else {
      listDom = <View>暂无更多数据</View>
    }
    return (
      <View>
        <View className='tit_'>工人列表</View>
        {listDom}
        <View>为这个工地添加工人</View>
      </View>
    )
  }
}

