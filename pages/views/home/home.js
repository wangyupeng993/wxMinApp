const app = getApp().globalData
const service = require('../../api/request/index.js')
const checkSession = require('../../api/checkSession/index.js')
Page({
    data: {
      enterHome: false,
      gridCol: 4,
      iconList: [{
        url: '/pages/views/InsidePages/LookingDoctor/LookingDoctor',
        icon: '../../assets/images/home/Doctors@2x.png',
        color: 'red',
        name: '找医生'
      }, {
        url: '/pages/views/InsidePages/DrugsClass/DrugsClass',
        icon: '../../assets/images/home/drug@2x.png',
        badge: 1,
        name: '找商品'
      }, {
        url: '/pages/views/InsidePages/hospital/hospital',
        icon: '../../assets/images/home/hospital@2x.png',
        color: 'yellow',
        name: '查医院'
      }, {
        url: '/pages/views/InsidePages/physician/physician',
        icon: '../../assets/images/home/cup@2x.png',
        color: 'olive',
        badge: 22,
        name: '医师讲堂'
      }],
      follow: [],
      forums: [], // 医师讲堂
      article: [] // 皮肤小知识
    },
    onLoad () {
      const doctor = wx.getStorageSync('doctor')
      const symptom = wx.getStorageSync('symptom')
      this.setData({doctor: doctor,symptom: symptom})
    doctor === '' || !doctor || doctor === null||symptom === ''||!symptom||symptom === null? wx.redirectTo({
        url: '/pages/views/initPage/initPage'
    }) : checkSession()
        .then(respone => {
            this.followDoctor()
            this.getHomeArticle()
            this.getHomePhysician()
        })
        .catch(error => {
            wx.login({
                timeout: 50000,
                success: respone => {
                    const {code} = respone
                    wx.setStorageSync('wxcode', code)
                    service.Login({jsCode: code,nickname: wx.getStorageSync('getUserInfo').nickName})
                        .then(respone => {
                            const {code} = respone.data
                            if (Number(code) === 200) {
                                const {key} = respone.data.data
                                wx.setStorageSync('sessionid', key)
                                wx.nextTick(() => {
                                    this.followDoctor()
                                    this.getHomeArticle()
                                    this.getHomePhysician()
                                })
                            }
                        })
                        .catch(error => {
                            console.log(error)
                        })

                },
                fail: error => {
                    console.log(error)
                }
            })
        })
    },
    onReady () {},
    onShow () {},
    onHide () {},
    onUnload () {},
    // 获取关注医生
    followDoctor () {
        service.followDoctor()
            .then(respone => {
                console.log(respone.data)
                this.setData({
                    follow: respone.data.data.map(item => item)
                })
            })
            .catch(error => {
                console.log(error)
            })
    },
    // 获取首页文章
    getHomeArticle () {
        service.getHomeArticle()
            .then(respone => {
                const article = respone.data.data.map(item => {
                    return {
                        id: item.articleId,
                        author: `作者：${item.articleAuthor}`,
                        title: item.articleTitle,
                        name: item.catalogName,
                        catalogId: item.catalogId,
                        image: ''
                    }
                })
                this.setData({article})
            })
            .catch(error => {
                console.log(error)
            })
    },
    // 获取首页课堂
    getHomePhysician () {
        service.getHomePhysician()
            .then(respone => {
                const forums = respone.data.data.map(item => {
                    return {
                        id: item.forumId,
                        author: `${item.doctorName}.${item.hospitalName}`,
                        title: item.forumTitle,
                        image: item.logoUrl,
                        money: `¥${item.forumPrice}`
                    }
                })
                this.setData({forums})
            })
            .catch(error => {
                console.log(error)
            })
    },
    // 文章详情页面
    articledetails (ev) {
        const {item} = ev.detail
        wx.navigateTo({
            url: `/pages/views/InsidePages/articledetails/index?articleid=${item.id}`
        })
    },
    // 课堂详情页面
    classroominfo (ev) {
        const {item} = ev.detail
        wx.navigateTo({
            url: `/pages/views/InsidePages/ClassroomInfo/ClassroomInfo?forumid=${item.id}`
        })
    },
    // 快速提问页面
    question () {
        wx.navigateTo({
            url: `/pages/views/InsidePages/question/index`
        })
    },
    // 分享
    onShareAppMessage () {
        return {
            title: '分享的标题',
            path: '/pages/views/home/home', // 分享路径
            imageUrl: '', // 分享图片
            success: (respone) => {
                console.log(respone)
            },
            error: (error) => {
                console.log(error)
            }
        }
    }
})
