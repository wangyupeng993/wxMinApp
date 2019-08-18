const service = require('../../../api/request/index.js')
const checkSession = require('../../../api/checkSession/index.js')
Page({
    data:{
        classroom: [],
        levelID: '',
        score: []
    },
    onLoad () {
        checkSession().then(respone => {
            this.getBuyforumslist()
        }).catch(error => {
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
                                    this.getBuyforumslist()
                                }
                            })
                            .catch(error => {})
                    },
                    fail: error => {}
                })
            })
    },
    onReady () {},
    onShow () {},
    onHide () {},
    onUnload () {},
    // 获取购买课堂列表
    getBuyforumslist () {
        service.getBuyforumslist()
            .then(respone => {
                const classroom = respone.data.data.map(item => item)
                this.setData({classroom})
                console.log(respone.data.data)
            })
            .catch(error => {
                console.log(error)
            })
    },
    // 提交评价
    bindFormSubmit (ev) {
        console.log(ev)
    },
    // 评价
    comments (ev) {
        const {forumid} = ev.currentTarget.dataset
        this.setData({levelID: forumid})
    },
    // 取消其评价
    cancelcomments () {
        this.setData({levelID: '',score:[]})
    },
    // 评分
    scoreSelected (ev) {
        const {scoreid} = ev.currentTarget.dataset
        let score = []
        for (var i = 0;i < (scoreid + 1);i ++) {
            score.push(i)
        }
        wx.nextTick(() => {
            this.setData({score})
        })
    }
})