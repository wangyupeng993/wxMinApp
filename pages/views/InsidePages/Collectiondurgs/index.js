const service = require('../../../api/request/index.js')
Page({
    data: {
        durgs: []
    },
    onLoad () {
        this.getCollectiondurgs()
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