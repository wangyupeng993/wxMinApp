const service = require('../../../api/request/index.js')
const checkSession = require('../../../api/checkSession/index.js')
Page({
    data: {
        catalogId: '',
        navTab: [],
        article: [],
        title: ''
    },
    onLoad () {
    },
    onReady () {},
    onShow () {
        checkSession().then(async respone => {
            await this.getArticleclass()
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
                                    await this.getArticleclass()
                                }
                            })
                            .catch(error => {})
                    },
                    fail: error => {}
                })
            })

    },
    onHide () {},
    onUnload () {},
    getArticleclass () {
        service.getArticleclass()
            .then(respone => {
                const navTab = respone.data.data.map(item => item)
                this.setData({navTab,catalogId: navTab[0].catalogId})
                this.getArticleslist({catalogId: navTab[0].catalogId,pageNo: 1,pageSize: 30,author: '', title: ''})
            })
            .catch(error => {
                console.log(error)
            })
    },
    getArticleslist (params) {
        service.getArticleslist(params)
            .then(respone => {
                const article = respone.data.data.map(item => item)
                this.setData({article})
            })
            .catch(error => {
                console.log(error)
            })
    },
    searchArticle () {
        const {title,catalogId} = this.data
        this.getArticleslist({catalogId,pageNo: 1,pageSize: 30,author: '', title})
    },
    // 获取用户输入值
    searchInputVal (ev) {
        const {value} = ev.detail
        this.setData({
            title: value
        })
    },
    SwitchNavTab (ev) {
        const {catalogid} = ev.currentTarget.dataset
        this.setData({
            catalogId: catalogid
        })
        this.getArticleslist({catalogId:catalogid,pageNo: 1,pageSize: 30,author: '', title: ''})
    }
})