const wxRequest = require('../../../utils/request.js')
const request = require('../../../utils/wxUploadFile.js')
const URL = 'https://m.ykangk.com' // 测试接口
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
    // 上传文件
    uploadFiles: (data = {}) => {
        return request({
            url: `${URL}/tool/upload`,
            header: {
                'Content-Type': 'multipart/form-data',
                'accept': 'application/json',
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
    // 获取医生信息
    getDoctorsinfo: (data = {}) => {
        return wxRequest({
            url:`${URL}/doctor/${data.doctorid}`,
            method: 'GET',
            header: {...FORMHEADER, 'X-Yhealth-Authentication': wx.getStorageSync('sessionid')}
        })
    },
    // 获取附近医院列表
    getHospitals: (data = {}) => {
        return wxRequest({
            url: `${URL}/hospitals`,
            method: 'POST',
            header: {...JSONHEADER, 'X-Yhealth-Authentication': wx.getStorageSync('sessionid')},
            data
        })
    },
    // 获取全部医院的列表
    getHospitalsAll: (data) => {
      return wxRequest({
          url: `${URL}/hospitals`,
          method: 'GET',
          header: {...FORMHEADER, 'X-Yhealth-Authentication': wx.getStorageSync('sessionid')},
          data
      })
    },
    // 获取医院详情信息
    getHospitalsinfo: (data) => {
        return wxRequest({
            url: `${URL}/hospital/${data.hospitalId}`,
            method: 'GET',
            header:{...FORMHEADER, 'X-Yhealth-Authentication': wx.getStorageSync('sessionid')}
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
    // 获取首页医师讲堂
    getHomePhysician: (data) => {
        return wxRequest({
            url: `${URL}/index/doctor/forums`,
            method: 'GET',
            header:{...FORMHEADER, 'X-Yhealth-Authentication': wx.getStorageSync('sessionid')},
            data
        })
    },
    // 获取讲堂详情
    getPhysicianinfo: (data) => {
        return wxRequest({
            url: `${URL}/doctor/forum/${data.forumid}`,
            method: 'GET',
            header:{...FORMHEADER, 'X-Yhealth-Authentication': wx.getStorageSync('sessionid')}
        })
    },
    // 收藏讲堂
    forumcollect: (data) => {
        return wxRequest({
            url: `${URL}/forum/collect`,
            method: 'POST',
            header: {...JSONHEADER, 'X-Yhealth-Authentication': wx.getStorageSync('sessionid')},
            data
        })
    },
    // 获取讲堂目录
    forumresources: (data) => {
        return wxRequest({
            url: `${URL}/doctor/forum/resources/${data.forumid}`,
            method: 'GET',
            header:{...FORMHEADER, 'X-Yhealth-Authentication': wx.getStorageSync('sessionid')}
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
    // 获取药品信息接口
    getDrugInfo: (data = {}) => {
        return wxRequest({
            url: `${URL}/drug/${data.drugid}`,
            method: 'GET',
            header:{...FORMHEADER, 'X-Yhealth-Authentication': wx.getStorageSync('sessionid')}
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
    searchInOutdrugs: (data = {}) => {
        return wxRequest({
            url: `${URL}/drug/find`,
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
    },
    // 医院入住
    hospitalsettledin: (data = {}) => {
        return wxRequest({
            url: `${URL}/hospital/settledin`,
            method: 'POST',
            header: {...JSONHEADER, 'X-Yhealth-Authentication': wx.getStorageSync('sessionid')},
            data
        })
    },
    // 医生入住
    doctorsettledin: (data = {}) => {
        return wxRequest({
            url: `${URL}/doctor/settled/in`,
            method: 'POST',
            header: {...JSONHEADER, 'X-Yhealth-Authentication': wx.getStorageSync('sessionid')},
            data
        })
    },
    // 获取首页文章
    getHomeArticle: (data) => {
        return wxRequest({
            url: `${URL}/index/articles`,
            method: 'GET',
            header:{...FORMHEADER, 'X-Yhealth-Authentication': wx.getStorageSync('sessionid')},
            data
        })
    },
    // 获取文章分类
    getArticleclass: (data) => {
        return wxRequest({
            url: `${URL}/article/catalogs`,
            method: 'GET',
            header:{...FORMHEADER, 'X-Yhealth-Authentication': wx.getStorageSync('sessionid')},
            data
        })
    },
    // 获取文章列表
    getArticleslist: (data ={}) => {
        return wxRequest({
            url: `${URL}/articles`,
            method: 'post',
            header: {...JSONHEADER, 'X-Yhealth-Authentication': wx.getStorageSync('sessionid')},
            data
        })
    },
    // 获取文章内容
    getArticlecontent: (data) => {
        return wxRequest({
            url: `${URL}/article/${data.articleid}`,
            method: 'GET',
            header:{...FORMHEADER, 'X-Yhealth-Authentication': wx.getStorageSync('sessionid')}
        })
    },
    // 关注医生
    doctorcollect: (data = {}) => {
        return wxRequest({
            url: `${URL}/doctor/collect`,
            method: 'POST',
            header: {...JSONHEADER, 'X-Yhealth-Authentication': wx.getStorageSync('sessionid')},
            data
        })
    },
    // 收藏药品
    drugcollect: (data = {}) => {
        return wxRequest({
            url: `${URL}/drug/collect`,
            method: 'POST',
            header: {...JSONHEADER, 'X-Yhealth-Authentication': wx.getStorageSync('sessionid')},
            data
        })
    },
    // 个人关注医生
    getconcernedDoctors: (data) => {
        return wxRequest({
            url: `${URL}/user/doctor`,
            method: 'post',
            header: {...JSONHEADER, 'X-Yhealth-Authentication': wx.getStorageSync('sessionid')},
            data
        })
    },
    // 个人关注病症
    getconcernedSymptoms: (data) => {
        return wxRequest({
            url: `${URL}/user/symptoms`,
            method: 'post',
            header: {...JSONHEADER, 'X-Yhealth-Authentication': wx.getStorageSync('sessionid')},
            data
        })
    },
    // 获取用户收藏药品
    getCollectiondurgs: (data) => {
        return wxRequest({
            url: `${URL}/user/drugs`,
            method: 'POST',
            header: {...JSONHEADER, 'X-Yhealth-Authentication': wx.getStorageSync('sessionid')},
            data
        })
    },
    // 获取用户收藏讲堂
    getCollectionclassroom: (data) => {
        return wxRequest({
            url: `${URL}/user/forums`,
            method: 'POST',
            header: {...JSONHEADER, 'X-Yhealth-Authentication': wx.getStorageSync('sessionid')},
            data
        })
    },
    // 获取品论列表
    getcommentslist: (data = {}) => {
        return wxRequest({
            url: `${URL}/comments`,
            method: 'POST',
            header: {...JSONHEADER, 'X-Yhealth-Authentication': wx.getStorageSync('sessionid')},
            data
        })
    },
    // 回复评论
    replycomments: (data = {}) => {
        return wxRequest({
            url: `${URL}/hospital/reply`,
            method: 'POST',
            header: {...JSONHEADER, 'X-Yhealth-Authentication': wx.getStorageSync('sessionid')},
            data
        })
    },
    // 获取购买讲堂列表
    getBuyforumslist: (data) => {
        return wxRequest({
            url: `${URL}/user/order/forums`,
            method: 'POST',
            header: {...JSONHEADER, 'X-Yhealth-Authentication': wx.getStorageSync('sessionid')},
            data
        })
    },
    skindiseaserecognize:(data = {} ) => {
        return wxRequest({
            url: `${URL}/skin/disease/recognize`,
            method: 'POST',
            data
        })
    }
}
module.exports = service
