const service = require('../../../api/request/index.js')
const checkSession = require('../../../api/checkSession/index.js')
Page({
    data: {
        doctorinfo: {},
        comments: [],
        commentId: ''
    },
    onLoad (ev) {
        const {doctorid} = ev
        checkSession().then(async respone => {
            if (doctorid) {
                await this.getDoctorsinfo({doctorid})
                await this.getcommentslist({pageNo: 1, pageSize: 30, resourceType: 'DOCTOR'})
            }
        }).catch(error => {
                wx.login({
                    timeout: 50000,
                    success: respone => {
                        const {code} = respone
                        wx.setStorageSync('wxcode', code)
                        service.Login({
                            jsCode: code,
                            nickname: wx.getStorageSync('getUserInfo').nickName
                        }).then(async respone => {
                                const {code} = respone.data
                                if (Number(code) === 200) {
                                    const {key} = respone.data.data
                                    wx.setStorageSync('sessionid', key)
                                    if (doctorid) {
                                        await this.getDoctorsinfo({doctorid})
                                        await this.getcommentslist({pageNo: 1, pageSize: 30, resourceType: 'DOCTOR'})
                                    }
                                }
                            }).catch(error => {})
                    },
                    fail: error => {}
                })
            })

    },
    onReady () {},
    onShow () {},
    onUnload () {},
    loadmore () {},
    // 获取医生信息
    getDoctorsinfo (params) {
        service.getDoctorsinfo(params)
            .then(respone => {
                this.setData({
                    doctorinfo:respone.data.data
                })
            })
            .catch(error => {
                console.log(error)
            })
    },
    doctorcollect () {
        const {doctorinfo} = this.data
        if (doctorinfo.isCollect) return false
        service.doctorcollect({doctorId: doctorinfo.doctorId, isCollect: true})
            .then(respone => {
                const {code} = respone.data
                if (Number(code) === 200 && code) {
                    wx.showToast({
                        title: '关注成功',
                        icon: 'success',
                        duration: 2000
                    })
                }
            })
            .catch(error => {})
    },
    // 获取评论列表
    getcommentslist (params) {
        service.getcommentslist(params)
            .then(respone => {
                const comments = respone.data.data.map(item => item)
                this.setData({comments})
            })
            .catch(error => {
                console.log(error)
            })
    },
    // 提交回复
    bindFormSubmit(ev) {
        console.log(ev)
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