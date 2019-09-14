const checkSession = require('../../../api/checkSession/index.js')
const service = require('../../../api/request/index.js')
Page({
    data:{
        FilePath: []
    },
    onLoad () {},
    onReady () {},
    onShow () {},
    onHide () {},
    onUnload () {},
    bindFormSubmit (ev) {
        const {feedbackContent} = ev.detail.value
        if (feedbackContent === ''||feedbackContent.length < 10) {
            wx.showToast({
                title: '请把您要反馈的问题描述清楚！！',
                icon: 'none',
                duration: 3000
            })
            return false
        }
        checkSession().then(respone => {
            this.feedback({feedbackContent, feedbackImages: this.data.FilePath})
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
                            this.feedback({feedbackContent, feedbackImages: this.data.FilePath})
                        }
                    }).catch(error => {})
                },
                fail: error => {}
            })
        })
    },
    feedback (params) {
        service.userfeedback(params)
            .then(respone => {
                const {code} = respone.data
                if (code === 200) {
                    wx.showToast({
                        title: '反馈成功，感谢您的反馈！',
                        icon: 'none',
                        duration: 3000,
                        success: respone => {
                            setTimeout(() => {
                                wx.navigateBack(-1)
                            }, 2000)
                        }
                    })
                }
                console.log(respone.data)
            })
            .catch(error => {
                console.log(error)
            })
    },
    // 获取照片
    chooseImage (ev) {
        const {idcard,name} = ev.currentTarget.dataset
        const number = 4 - this.data.FilePath.length
        wx.chooseImage({
            count: number,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: (respone) => {
                let {FilePath} = this.data
                respone.tempFilePaths.forEach((item, index, array) => {
                    if (FilePath.length < 4) {
                        FilePath.push(item)
                    }
                })
                wx.nextTick(() => {
                    this.setData({FilePath})
                })
            },
            fail: (error) => {}
        })
    },
    // 删除照片
    deletechooseImage(ev) {
        const {index} = ev.currentTarget.dataset
        const {FilePath} = this.data
        FilePath.splice(index,1)
        this.setData({FilePath})
    }
})
