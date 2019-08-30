const service = require('../../../api/request/index.js')
const checkSession = require('../../../api/checkSession/index.js')
Page({
    data: {
        specs: '20ml',
        druginfo: {},
        html: '',
        intr: 0,
        commentId: '',
        comments: []
    },
    onLoad (ev) {
        const {drugid} = ev
        checkSession().then(async respone => {
            if (drugid) {
                await this.setData({drugid})
                await this.getDrugInfo({drugid})
                await this.getcommentslist({pageNo: 1, pageSize: 30, resourceType: 'DRUG'})
            }
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
                                    if (drugid) {
                                        await this.setData({drugid})
                                        await this.getDrugInfo({drugid})
                                        await this.getcommentslist({pageNo: 1, pageSize: 30, resourceType: 'DRUG'})
                                    }
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
    loadmore () {},
    getDrugInfo (params) {
        service.getDrugInfo(params)
            .then(respone => {
                const {drugContent} = respone.data.data
                this.setData({
                    druginfo:respone.data.data,
                    html: drugContent.replace(/<img/gi, '<img style="max-width:100%;height:auto;display:block" ')
                        .replace(/<section/g, '<div')
                        .replace(/\/section>/g, '\div>')
                })
                console.log(respone.data.data)
            })
            .catch(error => {
                console.log(error)
            })
    },
    drugcollect () {
        const {druginfo} = this.data
        if (druginfo.isCollect) return false
        service.drugcollect({drugId: this.data.drugid, isCollect: true})
            .then(respone => {
                console.log(respone.data)
            })
            .catch(error => {
                console.log(error)
            })
    },
    intrSwitch (ev) {
        const {type} = ev.currentTarget.dataset
        this.setData({
            intr: Number(type)
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
    // 提交回复
    bindFormSubmit(ev) {
        console.log(ev)
    },
    // 回复评论
    replycomments (ev) {},
    // 购买药品
    navigatorPay() {
        const {druginfo} = this.data
        delete druginfo.drugContent
        wx.navigateTo({
            url:`/pages/views/InsidePages/pay/pay?goods=${JSON.stringify(druginfo)}`
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