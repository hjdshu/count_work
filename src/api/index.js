import store from '../store'
import create from './user'

// 直接拿user的接口
export function getUserInfoBase (callback, completeFunc) {
  if (store.openId) {
    getuserinfo(store.openId, callback, completeFunc)
  } else {
    getOpenId((err, openId) => {
      store.openId = openId
      getuserinfo(openId, callback, completeFunc)
    })
  }
}

function getuserinfo (openId, callback, completeFunc) {
  const db = wx.cloud.database()
  const userCollection = db.collection('user')
  userCollection.where({
    _openid: openId
  }).get({
    success: function(res) {
      if (res.data.length) {
        callback(null, res.data[0])
      } else {
        // 当该用户不存在时
        create(openId, {}, callback)
      }
    },
    fail: callback,
    complete: (res) => {
      if (completeFunc) {
        completeFunc(res)
      }
    }
  })
}



// 调用云函数拿open_id
export function getOpenId (callback) {
  let open_id = wx.getStorageSync('open_id')
  if (open_id) {
    return callback(null, open_id)
  }
  wx.cloud.callFunction({
    name: 'getUserInfo',
    success: (res) => {
      callback(null, res.result.userInfo.openId)
      wx.setStorageSync('open_id', res.result.userInfo.openId)
    },
    fail: callback,
    complete: () => {
    }
  })
}