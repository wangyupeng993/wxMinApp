const service = require('../../../api/request/index.js')
const checkSession = require('../../../api/checkSession/index.js')
Page({
    data: {
        durgs: []
    },
    onLoad () {
        checkSession().then(async respone => {
            await this.getCollectiondurgs()
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
                                    await this.getCollectiondurgs()
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
    getCollectiondurgs () {
        service.getCollectiondurgs()
            .then(respone => {
                const durgs = respone.data.data.map(item => item)
                this.setData({durgs})
            })
            .catch(error => {
                console.log(error)
            })
    }
})