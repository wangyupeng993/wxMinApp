const service = require('../../../api/request/index.js')
const checkSession = require('../../../api/checkSession/index.js')
Page({
    data:{
        levelID: '',
        navTab:[{
            value:'',
            label: '全部'
        }, {
            value: 'WAIT_RECEIVED',
            label: '待收货'
        }, {
            value: 'WAIT',
            label: '待付款'
        }, {
            value: 'FINISH',
            label: '已完成'
        }],
        navClassTab: '',
        drugs: []
    },
    onLoad () {
        checkSession().then(respone => {
            this.getBuydrugslist({orderStatus: "WAIT",pageNo: 1,pageSize: 30})
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
                                this.getBuydrugslist({orderStatus: "WAIT",pageNo: 1,pageSize: 30})
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
    bindFormSubmit (ev) {
        console.log(ev)
    },
    // 评价
    comments (ev) {
        const {orderid} = ev.currentTarget.dataset
        this.setData({levelID: orderid})
    },
    getBuydrugslist (params) {
        service.getBuydrugslist(params)
            .then(respone => {
                const drugs = respone.data.data.map(item => item)
                this.setData({drugs})
                console.log(respone.data.data)
            })
            .catch(error => {
                console.log(error)
            })
    },
    SwitchNavTab (ev) {
        const {itemType} = ev.currentTarget.dataset
        this.setData({navClassTab: itemType})
        this.getBuydrugslist({orderStatus: itemType,pageNo: 1,pageSize: 30})
    }
})
