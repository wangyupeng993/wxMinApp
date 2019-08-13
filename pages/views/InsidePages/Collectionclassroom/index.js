const service = require('../../../api/request/index.js')
Page({
    data: {
        classroom: []
    },
    onLoad () {
        this.getCollectionclassroom()
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