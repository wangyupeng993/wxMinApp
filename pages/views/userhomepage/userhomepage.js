const app = getApp().globalData
const service = require('../../api/request/index.js')
Page({
    data: {
        userInfo: null,
        phone: null,
        wxcode: null // cod
    },
    onLoad () {
        this.setData({
            userInfo: wx.getStorageSync('getUserInfo'),
            phone: wx.getStorageSync('phone'),
            wxcode: wx.getStorageSync('wxcode')
        })
        wx.nextTick(() => {
            const {phone} = this.data
            if (phone === null || phone === '') {
                wx.login({
                    success: (respone) => {
                        const {code} = respone
                        const {userInfo} = this.data
                        wx.setStorageSync('wxcode', code)
                        this.setData({wxcode: wx.getStorageSync('wxcode')})
                        service.Login({jsCode: code, nickname: userInfo.nickName})
                            .then(respone => {
                                const {code} = respone.data
                                if (code === 200) {
                                    const {key} = respone.data.data
                                    wx.setStorageSync('sessionid', key)
                                }
                            })
                            .catch(error => {})
                    },
                    fail: (error) => {}
                })
            }
        })
    },
    onReady () {
        console.log('页面渲染完成之后执行，只执行一次')
    },
    onShow () {
        console.log('页面显示就会执行')
    },
    onHide () {
        console.log('页面隐藏就是执行')
    },
    onUnload () {
        console.log('页面卸载的时候就会执行，只执行一次')
    },
    // 获取用户手机号
    getUserPhone (parmas = {}) {
        service.getUserPhone(parmas)
            .then(respone => {
                const {phoneNum} = respone.data.data
                wx.setStorageSync('phone',phoneNum)
                this.setData({
                    phone: wx.getStorageSync('phone')
                })
            })
            .catch(error => {
                console.log(error)
            })
    },
    getPhoneNumber (params) {
        console.log(params)
        const {userInfo} = this.data
        const {encryptedData, iv} = params.detail
        this.getUserPhone({
            encrypted:encodeURIComponent(encryptedData),
            iv: iv,
            nickname: userInfo.nickName
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