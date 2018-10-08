/*
* 弹出错误函数
*/
export function tipText (text, success) {
  if (success) {
    wx.showToast({
      title: text,
      icon: 'success',
      duration: 2000,
      mask: true
    })
  } else {
    wx.showToast({
      title: text,
      icon: 'none',
      duration: 2000,
      mask: true
    })
  }
}

export function tipText2 (text, success) {
  if (success) {
    wx.showToast({
      title: text,
      icon: 'success',
      duration: 2000,
      mask: true
    })
  } else {
    wx.showToast({
      title: text,
      icon: 'none',
      duration: 2000,
      mask: true
    })
  }
}