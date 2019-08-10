const service = require('../../../api/request/index.js')
Page({
    data: {},
    onLoad (ev) {
        console.log(ev)
        service.getHospitalsinfo({hospitalId: ev.hospitalid})
            .then(respone => {
                console.log(respone.data)
            })
            .catch(error => {
                console.log(error)
            })
    },
    onReady() {},
    onShow () {},
    onHide () {},
    onUnload () {},
    loadmore () {}
})