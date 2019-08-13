const service = require('../../../api/request/index.js')
const QQMAPWX = require('../../../api/Map/index.js')
Page({
    data: {
        hospitainfo: null,
        longitude: '',
        latitude: ''
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
                const {address} = respone.data.data
                this.setData({hospitainfo:  respone.data.data})
                QQMAPWX.geocoder({address})
                    .then(respone => {
                        const {location} = respone.result
                        if (location) {
                            this.setData({
                                longitude: location.lng,
                                latitude: location.lat
                            })
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
            })
            .catch(error => {
                console.log(error)
            })
    },
    SeeRoute () {
        const {longitude,latitude} = this.data
        wx.navigateTo({
            url: `/pages/views/InsidePages/RoutePlanning/index?longitude=${longitude}&latitude=${latitude}`
        })
    }
})