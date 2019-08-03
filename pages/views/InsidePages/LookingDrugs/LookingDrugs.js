const service = require('../../../api/request/index.js')
Page({
    data: {
        Drugsclass: []
    },
    onLoad () {
        this.getDrugsclass()
    },
    onReady () {},
    onShow () {},
    onHide () {},
    onUnload () {},
    loadmore () {},
    getDrugsclass () {
        service.getDrugsclass()
            .then(respone => {
                const Drugsclass = respone.data.data.map(item => item)
                this.setData({Drugsclass})
            })
            .catch(error => {
                console.log(error)
            })
    }
})