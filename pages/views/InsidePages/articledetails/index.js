const service = require('../../../api/request/index.js')
Page({
    data: {
        article: {},
        html: []
    },
    onLoad (ev) {
        this.getArticlecontent({articleid: ev.articleid})
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
                        html:articleContent.replace(/<img/gi, '<img style="max-width:100%;height:auto;display:block" ')
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