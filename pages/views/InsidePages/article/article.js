const service = require('../../../api/request/index.js')
Page({
    data: {
        catalogId: '',
        navTab: [],
        article: [],
        title: ''
    },
    onLoad () {},
    onReady () {},
    onShow () {
        this.getArticleclass()
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