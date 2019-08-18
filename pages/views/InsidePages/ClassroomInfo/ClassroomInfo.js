const service = require('../../../api/request/index.js')
const checkSession = require('../../../api/checkSession/index.js')
Page({
    data: {
        intr: 0,
        classroom: {},
        classroomImage: [],
        doctorMessage: '',
        resources: [],
        videosrc: ''
    },
    onLoad (ev) {
        checkSession().then(async respone => {
            await this.getPhysicianinfo({forumid: ev.forumid})
            await this.forumresources({forumid: ev.forumid})
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
                                    await wx.setStorageSync('sessionid', key)
                                    await this.getPhysicianinfo({forumid: ev.forumid})
                                    await this.forumresources({forumid: ev.forumid})
                                }
                            }).catch(error => {})
                    },
                    fail: error => {}
                })
            })

    },
    onReady () {},
    onShow () {
        console.log(this.options,'==============')
    },
    onHide () {},
    onUnload () {},
    loadmore () {},
    intrSwitch (ev) {
        const {type} = ev.currentTarget.dataset
        this.setData({
            intr: Number(type)
        })
    },
    // 讲堂信息
    getPhysicianinfo (params) {
        service.getPhysicianinfo(params)
            .then(respone => {
                const doctorMessage = respone.data.data.doctorMessage
                    .replace(/<img/gi, '<img style="max-width:100%;height:auto;display:block" ')
                    .replace(/<section/g, '<div')
                    .replace(/\/section>/g, '\div>')
                this.setData({
                    classroom: respone.data.data,
                    classroomImage: [respone.data.data.logoUrl],
                    doctorMessage
                })
            })
            .catch(error => {
                console.log(error)
            })
    },
    // 讲堂收藏
    forumcollect () {
        const {classroom} = this.data
        if (classroom.isCollect) return false
        service.forumcollect({forumId:classroom.forumId, isCollect: true})
            .then(respone => {
                const {code} = respone.data
                if (Number(code) === 200 && code) {
                    wx.showToast({
                        title: '收藏讲堂成功',
                        icon: 'success',
                        duration: 2000
                    })
                }
            })
            .catch(error => {
                console.log(error)
            })
    },
    // 讲堂目录
    forumresources (params) {
        service.forumresources(params)
            .then(respone => {
                this.setData({
                    resources: respone.data.data
                })
            })
            .catch(error => {
                console.log(error)
            })
    },
    // 播放视频
    playVideo (ev) {
        const {item} = ev.currentTarget.dataset
        this.setData({
            videosrc: ''
        })
        wx.nextTick(() => {
            this.setData({
                videosrc: item.resourceUrl
            })
        })
        console.log(ev.currentTarget.dataset)
    },
    onShareAppMessage () {}
})