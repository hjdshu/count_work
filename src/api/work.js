// work database
/*
  {
    name: 名称
    _id: id
    create_time: 创建时间, number
    update_time: 更新时间, number
    member_count: 成员人数, number
    work_count: 产生的总工时，number
  }
*/

// workman database
/*
  {
    _id: id
    create_time: 创建时间, number
    update_time: 更新时间, number
    work_id: string, 工地id
    work_count: 产生的总工时，number
    teamer_id: string,
    teamer_name: string
  }
*/
const db = wx.cloud.database()
const workCollection = db.collection('work')
const workManCollection = db.collection('workman')

export function getworklist (callback) {
  // first1
  workCollection.orderBy('create_time', 'desc').get({
    success: (res) => {
      if (res.data) {
        callback(null, res.data)
      } else {
        callback('获取失败')
      }
    }
  })
}

export function editwork (param, callback) {
  workCollection.doc(param._id).get({
    success: (res) => {
      if (res.data) {
        edit()
      } else {
        callback('没有找到这条记录')
      }
    }
  })

  function edit () {
    workCollection.doc(param._id).update({
      data: {
        name: param.name,
        work_count: param.work_count,
        member_count: param.member_count,
        update_time: new Date().getTime()
      },
      success: (res) => {
        if (res.data) {
          callback(null, res.data)
        } else {
          callback('编辑错误')
        }
      }
    })
  }
}

export function creatework (param, callback) {
  workCollection.where({
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
    workCollection.add({
      data: {
        name: param.name,
        member_count: 0,
        update_time: new Date().getTime(),
        create_time: new Date().getTime(),
        work_count: 0
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

export function getWorkmanlist (workId, callback) {
  workManCollection.where({
    work_id: workId
  }).get({
    success: (res) => {
      if (res.data) {
        callback(null, res.data)
      } else {
        callback('获取列表失败')
      }
    },
    fail: (res) => {
      console.log('fail:', res)
      callback('获取失败')
    }
  })
}

export function createWorkman (param, callback) {
  workManCollection.where({
    work_id: param.work_id,
    teamer_id: param.teamer_id,
    teamer_name: param.teamer_name
  }).get({
    success: (res) => {
      if (res.data.length) {
        callback('该工人已添加')
      } else {
        create()
      }
    },
    fail: () => {
      callback('获取失败')
    }
  })

  function create () {
    workManCollection.add({
      data: {
        create_time: new Date().getTime(),
        update_time: new Date().getTime(),
        work_id: param.work_id,
        work_count: 0,
        teamer_id: param.teamer_id,
        teamer_name: param.teamer_name
      },
      success: (res) => {
        callback(null, res)
      },
      fail: () => {
        callback('创建失败')
      }
    })
  }
}