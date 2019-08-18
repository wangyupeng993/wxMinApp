const service = require('../../../api/request/index.js')
const QQMAPWX = require('../../../api/Map/index.js')
const checkSession = require('../../../api/checkSession/index.js')
Page({
    data: {
        hospitainfo: null,
        longitude: '',
        latitude: '',
        comments: [],
        commentId: ''
    },
    onLoad (ev) {
        checkSession().then(async respone => {
            await this.gethospitainfo({hospitalId: ev.hospitalid})
            await this.getcommentslist({pageNo: 1, pageSize: 30, resourceType: 'HOSPITAL'})
        }).catch(error => {
                wx.login({
                    timeout: 50000,
                    success: respone => {
                        const {code} = respone
                        wx.setStorageSync('wxcode', code)
                        service.Login({jsCode: code,nickname: wx.getStorageSync('getUserInfo').nickName})
                            .then(async respone => {
                                const {code} = respone.data
                                if (Number(code) === 200) {
                                    const {key} = respone.data.data
                                    await wx.setStorageSync('sessionid', key)
                                    await this.gethospitainfo({hospitalId: ev.hospitalid})
                                    await this.getcommentslist({pageNo: 1, pageSize: 30, resourceType: 'HOSPITAL'})
                                }
                            })
                            .catch(error => {})
                    },
                    fail: error => {}
                })
            })

    },
    onReady() {},
    onShow () {},
    onHide () {},
    onUnload () {},
    loadmore () {},
    // 获取医院详情
    gethospitainfo (params) {
        service.getHospitalsinfo(params)
            .then(respone => {
                const {address} = respone.data.data
                this.setData({hospitainfo:  respone.data.data})
                QQMAPWX.geocoder({address})
                    .then(respone => {
                        const {location} = respone.result
                        if (location) {
                            this.setData({
                                longitude: location.lng,
                                latitude: location.lat
                            })
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
            })
            .catch(error => {
                console.log(error)
            })
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
    // 查看路线规划
    SeeRoute () {
        const {longitude,latitude} = this.data
        wx.navigateTo({
            url: `/pages/views/InsidePages/RoutePlanning/index?longitude=${longitude}&latitude=${latitude}`
        })
    },
    // 提交回复
    bindFormSubmit(ev) {
        const {content} = ev.detail.value
        service.replycomments({commentId: this.data.commentId, content})
            .then(respone => {
                console.log(respone.data)
            })
            .catch(error => {
                console.log(error)
            })
    },
    // 回复评论
    replycomments (ev) {
        const {commentid} = ev.currentTarget.dataset
        this.setData({
            commentId: commentid
        })
        console.log(ev.currentTarget.dataset)
    },
    // 取消评论
    cancelreplycomments () {
        this.setData({
            commentId: ''
        })
    },
})