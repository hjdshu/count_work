/* 
  队员基础表
  {
    name: 姓名 string
    phone: 电话 string
    create_time: 创建时间 number
    refresh_time: 更新时间 number 
  }
*/
const db = wx.cloud.database()
const teamerBaseCollection = db.collection('teamer_base')

export function getUserList (callback) {
  teamerBaseCollection.get({
    success: (res) => {
      if (res.data) {
        callback(null, res.data)
      } else {
        callback('获取失败')
      }
    }
  })
}

export function createWorker (param, callback) {

  teamerBaseCollection.where({
    name: param.name
  }).get({
    success: (res) => {
      if (res.data.length) {
        callback('名称已存在')
      } else {
        create()
      }
    }
  })
  
  function create () {
    teamerBaseCollection.add({
      data: {
        name: param.name,
        phone: param.phone,
        create_time: new Date().getTime(),
        refresh_time: new Date().getTime()
      },
      success: (res) => {
        if (res) {
          callback(null, res.data)
        } else {
          callback('创建错误')
        }
      }
    })
  }

}

export function editWorker (param, callback) {
  teamerBaseCollection.doc(param._id).get({
    success: (res) => {
      if (res.data) {
        edit()
      } else {
        callback('没有找到这条记录')
      }
    }
  })
  
  function edit () {
    teamerBaseCollection.update({
      data: {
        name: param.name,
        phone: param.phone,
        refresh_time: new Date().getTime()
      },
      success: (res) => {
        if (res) {
          callback(null, res.data)
        } else {
          callback('编辑错误')
        }
      }
    })
  }
  
}
