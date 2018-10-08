// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const userCollection = db.collection('user')

// 云函数入口函数
exports.main = async (event, context) => {
  let user = await userCollection.where({
    open_id: event.userInfo.openId // 填入当前用户 openid
  }).get()

  if (user.data.length) {
    await userCollection.doc(user.data[0]._id).update({
      // data 传入需要局部更新的数据
      data: {
        refresh_time: new Date().toJSON()
      }
    })
    let UpdateDUser = await userCollection.doc(user.data[0]._id).get()
    return {
      user: UpdateDUser.data
    }
  } 

  // 没找到这个用户，就去创建一个用户
  let result = await userCollection.add({
    data: {
      create_time: new Date().toJSON(),
      refresh_time: new Date().toJSON(),
      open_id: event.userInfo.openId
    }
  })

  let createUser = await userCollection.doc(result._id).get()
  return {
    user: createUser.data
  }

}