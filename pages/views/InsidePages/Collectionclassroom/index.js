const service = require('../../../api/request/index.js')
const checkSession = require('../../../api/checkSession/index.js')
Page({
    data: {
        classroom: []
    },
    onLoad () {
        checkSession().then(async respone => {
            await this.getCollectionclassroom()
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
                                    await this.getCollectionclassroom()
                                }
                            }).catch(error => {})
                    },
                    fail: error => {}
                })
            })

    },
    onReady () {},
    onShow () {},
    onHide () {},
    onUnload () {},
    getCollectionclassroom () {
        service.getCollectionclassroom()
            .then(respone => {
                const classroom = respone.data.data
                this.setData({classroom})
            })
            .catch(error => {
                console.log(error)
            })
    }
})