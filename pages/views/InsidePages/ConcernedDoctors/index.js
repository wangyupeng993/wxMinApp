const service = require('../../../api/request/index.js')
const checkSession = require('../../../api/checkSession/index.js')
Page({
    data:{
        tipsText: '',
        doctors: []
    },
    onLoad () {
        checkSession().then(async respone => {
            await this.getconcernedDoctors()
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
                                    await this.getconcernedDoctors()
                                }
                            })
                            .catch(error => {})
                    },
                    fail: error => {}
                })
            })

    },
    onReady () {},
    onShow() {},
    onHide () {},
    onUnload () {},
    getconcernedDoctors () {
        service.getconcernedDoctors()
            .then(respone => {
                const doctors = respone.data.data.map(item => item)
                const tipsText = doctors.length > 0? '':'暂无您关注的医生......'
                this.setData({doctors,tipsText})
            })
            .catch(error => {
                console.log(error)
            })
    }
})