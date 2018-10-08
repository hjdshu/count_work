export default function createUser (openId, userInfo, callback) {
  const db = wx.cloud.database()
  const userCollection = db.collection('user')
  
  // first1
  userCollection.where({
    open_id: openId // 填入当前用户 openid
  }).get({
    success: (res) => {
      if (res.data.length) {
        if (userInfo.nickName) {
          userCollection.doc(res.data[0]._id).update({
            data: {
              refresh_time: new Date().getTime(),
              userInfo: userInfo 
            },
            success: () => {
              userCollection.doc(res.data[0]._id).get({
                success: (resultDoc) => {
                  callback(null, resultDoc.data)
                }
              })
            }
          })
        } else {
          callback(null, res.data[0])
        }
      } else {
        // 如果没找到就创建一个
        userCollection.add({
          data: {
            create_time: new Date().getTime(),
            refresh_time: new Date().getTime(),
            open_id: openId,
            userInfo: userInfo 
          },
          success: (result) => {
            userCollection.doc(result._id).get({
              success: (resultDoc) => {
                callback(null, resultDoc.data)
              }
            })
          }
        })
      }
    }
  })
} 