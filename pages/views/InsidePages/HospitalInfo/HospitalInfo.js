const service = require('../../../api/request/index.js')
Page({
    data: {
        hospitainfo: null
    },
    onLoad (ev) {
        this.gethospitainfo({hospitalId: ev.hospitalid})
    },
    onReady() {},
    onShow () {},
    onHide () {},
    onUnload () {},
    loadmore () {},
    gethospitainfo (params) {
        service.getHospitalsinfo(params)
            .then(respone => {
                console.log(respone.data.data)
                this.setData({
                    hospitainfo:  respone.data.data
                })
            })
            .catch(error => {
                console.log(error)
            })
    }
})