const wxRequest = require('../../../utils/request.js')
const URL = 'http://m.ykangk.com' // 测试接口
const FORMHEADER = {'content-type': 'application/x-www-form-urlencoded'}
const JSONHEADER = {'content-type': 'application/json'}
const service = {
    // 登录
    Login: (data) => {
        return wxRequest({
            url: `${URL}/login`,
            method: 'POST',
            header: JSONHEADER,
            data
        })
    },
    // 获取用户信息
    getUserInfo: (data) => {
        return wxRequest({
            url: `${URL}/supply/user`,
            method: 'POST',
            header: JSONHEADER,
            data
        })
    },
    // 获取初始化页面的症状
    getSymptoms: (data) => {
        return wxRequest({
            url: `${URL}/initial/symptoms`,
            method: 'POST',
            header: JSONHEADER,
            data
        })
    },
    // 获取初始化医生信息接口
    getDiseases: (data) => {
        return wxRequest({
            url: `${URL}/initial/skillful/diseases`,
            method: 'POST',
            header: JSONHEADER,
            data
        })
    },
    // 保存初始化页面选择
    saveinitPageinfo: (data) => {
        return wxRequest({
            url: `${URL}/initial/save/info`,
            method: 'POST',
            header: JSONHEADER,
            data
        })
    },
    // 个人关注医生列表
    followDoctor: (data) => {
      return wxRequest({
          url: `${URL}/user/doctor`,
          method: 'POST',
          header: JSONHEADER,
          data
      })
    },
    // 获取医生列表
    getDoctors: (data) => {
        return wxRequest({
            url: `${URL}/doctors`,
            method: 'POST',
            header: JSONHEADER,
            data
        })
    },
    // 获取医院列表
    getHospitals: (data) => {
        return wxRequest({
            url: `${URL}/hospitals`,
            method: 'GET',
            header: JSONHEADER,
            data
        })
    }
}
module.exports = service