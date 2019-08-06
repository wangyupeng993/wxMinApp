const wxRequest = require('../../../utils/request.js')
const request = require('../../../utils/wxUploadFile.js')
const URL = 'http://m.ykangk.com' // 测试接口
const FORMHEADER = {'content-type': 'application/x-www-form-urlencoded'}
const JSONHEADER = {'content-type': 'application/json'}
const service = {
    // 登录
    Login: (data = {}) => {
        return wxRequest({
            url: `${URL}/login`,
            method: 'POST',
            header: {...JSONHEADER, 'X-Yhealth-Authentication': wx.getStorageSync('sessionid')},
            data
        })
    },
    // 获取用户手机号
    getUserPhone: (data = {}) => {
        return wxRequest({
            url: `${URL}/supply/user`,
            method: 'POST',
            header: {...JSONHEADER, 'X-Yhealth-Authentication': wx.getStorageSync('sessionid')},
            data
        })
    },
    // 获取初始化页面的症状
    getSymptoms: (data) => {
        return wxRequest({
            url: `${URL}/initial/symptoms`,
            method: 'POST',
            header: {...JSONHEADER, 'X-Yhealth-Authentication': wx.getStorageSync('sessionid')},
            data
        })
    },
    // 获取初始化医生信息接口
    getDiseases: (data) => {
        return wxRequest({
            url: `${URL}/initial/skillful/diseases`,
            method: 'POST',
            header: {...JSONHEADER, 'X-Yhealth-Authentication': wx.getStorageSync('sessionid')},
            data
        })
    },
    // 保存初始化页面选择
    saveinitPageinfo: (data = {}) => {
        return wxRequest({
            url: `${URL}/initial/save/info`,
            method: 'POST',
            header: {...JSONHEADER, 'X-Yhealth-Authentication': wx.getStorageSync('sessionid')},
            data
        })
    },
    uploadFiles: (data = {}) => {
        return request({
            url: `${URL}/hospital/settledin`,
            header: {
                'Content-Type': 'multipart/form-data',
                'X-Yhealth-Authentication': wx.getStorageSync('sessionid')
            },
            ...data
        })
    },
    // 个人关注医生列表
    followDoctor: (data = {}) => {
      return wxRequest({
          url: `${URL}/user/doctor`,
          method: 'POST',
          header: {...JSONHEADER, 'X-Yhealth-Authentication': wx.getStorageSync('sessionid')},
          data
      })
    },
    // 获取医生列表
    getDoctors: (data = {}) => {
        return wxRequest({
            url: `${URL}/near/doctors`,
            method: 'POST',
            header: {...JSONHEADER, 'X-Yhealth-Authentication': wx.getStorageSync('sessionid')},
            data
        })
    },
    // 获取医院列表
    getHospitals: (data = {}) => {
        return wxRequest({
            url: `${URL}/hospitals`,
            method: 'POST',
            header: {...JSONHEADER, 'X-Yhealth-Authentication': wx.getStorageSync('sessionid')},
            data
        })
    },
    // 获取医师讲堂分类
    getPhysicianclass: (data) => {
        return wxRequest({
            url: `${URL}/forum/catalogs`,
            method: 'GET',
            header: {...FORMHEADER, 'X-Yhealth-Authentication': wx.getStorageSync('sessionid')},
            data
        })
    },
    // 获取医师讲堂列表
    getPhysician: (data = {}) => {
        return wxRequest({
            url: `${URL}/doctor/forums`,
            method: 'POST',
            header: {...JSONHEADER, 'X-Yhealth-Authentication': wx.getStorageSync('sessionid')},
            data
        })
    },
    // 获取药品分类
    getDrugsclass: (data) => {
        return wxRequest({
            url: `${URL}/drug/catalogs`,
            method: 'POST',
            header: {...JSONHEADER, 'X-Yhealth-Authentication': wx.getStorageSync('sessionid')},
            data
        })
    },
    // 获取药品分类列表
    getDrugsclasslist: (data = {}) => {
        return wxRequest({
            url: `${URL}/drugs`,
            method: 'POST',
            header: {...JSONHEADER, 'X-Yhealth-Authentication': wx.getStorageSync('sessionid')},
            data
        })
    },
    // 搜索药品接口
    searchdrugs: (data = {}) => {
        return wxRequest({
            url: `${URL}/index/search/drugs`,
            method: 'POST',
            header: {...JSONHEADER, 'X-Yhealth-Authentication': wx.getStorageSync('sessionid')},
            data
        })
    },
    // 搜索医生接口
    searchdoctors: (data = {}) => {
        return wxRequest({
            url: `${URL}/index/search/doctors`,
            method: 'POST',
            header: {...JSONHEADER, 'X-Yhealth-Authentication': wx.getStorageSync('sessionid')},
            data
        })
    }
}
module.exports = service
