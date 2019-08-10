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
                console.log(respone.data)
            })
            .catch(error => {
                console.log(error)
            })
    },
    searchArticle () {},
    // 获取用户输入值
    searchInputVal (ev) {
        const {value} = ev.detail
        this.setData({
            title: value
        })
    }
})