const service = require('../../../api/request/index.js')
const checkSession = require('../../../api/checkSession/index.js')
Page({
    data: {
        city: ['请选择','城市','地区']
    },
    onLoad () {},
    onReady () {},
    onShow () {},
    onHide () {},
    onUnload () {},
    bindRegionChange (ev) {
        console.log(ev.detail.value)
        this.setData({
            city: ev.detail.value
        })
    },
    bindFormSubmit (ev) {
        const {receiverAddress,receiverName,receiverPhone} = ev.detail.value
        const address = this.data.city[0]+this.data.city[1]+this.data.city[2]+receiverAddress
        if (this.data.city[0] === '请选择'||this.data.city[1]=== '城市'||this.data.city[2] === '地区') {
            wx.showToast({
                title: '请选择城市',
                icon: 'none',
                duration: 2000
            })
            return false
        }
        if (receiverAddress === ''||receiverName === ''||receiverPhone === '') {
            wx.showToast({
                title: '收货信息填写不完整，请完善收货信息！',
                icon: 'none',
                duration: 2000
            })
            return false
        }

        checkSession().then(respone => {
            this.newUseraddress({receiverAddress:address,receiverName,receiverPhone})
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
                            this.newUseraddress({receiverAddress:address,receiverName,receiverPhone})
                        }
                    }).catch(error => {})
                },
                fail: error => {}
            })
        })
    },
    newUseraddress (params) {
        service.newuseraddress(params)
            .then(respone => {
                const {code} = respone.data
                if (code === 200) {
                    wx.navigateBack(-1)
                }
            })
            .catch(error => {
                console.log(error)
            })
    },
    onShareAppMessage () {}
})
