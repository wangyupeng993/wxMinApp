const service = require('../../../api/request/index.js')
const checkSession = require('../../../api/checkSession/index.js')
Page({
    data: {
        article: {},
        html: []
    },
    onLoad (ev) {
        checkSession().then(respone => {
            this.getArticlecontent({articleid: ev.articleid})
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
                                    this.getArticlecontent({articleid: ev.articleid})
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
    getArticlecontent (params) {
        service.getArticlecontent(params)
            .then(respone => {
                const {articleContent} = respone.data.data
                this.setData({
                    article: respone.data.data
                })

                if (articleContent) {
                    this.setData({
                        html:articleContent.replace(/<img/gi, '<img style="max-width:100%;height:auto;display:block"')
                            .replace(/<section/g, '<div')
                            .replace(/\/section>/g, '\div>')
                    })
                }

            })
            .catch(error => {
                console.log(error)
            })
    }
})
