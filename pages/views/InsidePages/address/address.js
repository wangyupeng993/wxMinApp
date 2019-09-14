const service = require('../../../api/request/index.js')
const checkSession = require('../../../api/checkSession/index.js')
Page({
    data: {
        address:[],
        delete: false
    },
    onLoad () {
        checkSession().then(respone => {
            this.useraddress()
        }).catch(error => {
            wx.login({
                timeout: 50000,
                success: respone => {
                    const {code} = respone
                    wx.setStorageSync('wxcode', code)
                    service.Login({
                        jsCode: code,
                        nickname: wx.getStorageSync('getUserInfo').nickName
                    }).then(respone => {
                        const {code} = respone.data
                        if (Number(code) === 200) {
                            const {key} = respone.data.data
                            wx.setStorageSync('sessionid', key)
                            this.useraddress()
                        }
                    }).catch(error => {})
                },
                fail: error => {}
            })
        })
    },
    onReady () {},
    onShow () {},
    onHide() {},
    onUnload () {},
    onShareAppMessage () {},
    useraddress () {
        service.useraddress()
            .then(respone => {
                const address = respone.data.data.map(item => item)
                this.setData({address})
            })
            .catch(error => {
                console.log(error)
            })
    },
    showDELETE() {this.setData({delete: true})},
    hideDELETE() {this.setData({delete: false})},
    deleteaddress (ev) {
        console.log(ev)
    },
    defaultaddress () {}
})
