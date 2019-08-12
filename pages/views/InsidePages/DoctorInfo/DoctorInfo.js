const service = require('../../../api/request/index.js')
Page({
    data: {
        doctorinfo: {}
    },
    onLoad (ev) {
        const {doctorid} = ev
        if (doctorid) {
            this.getDoctorsinfo({doctorid})
        }
    },
    onReady () {},
    onShow () {},
    onUnload () {},
    loadmore () {},
    getDoctorsinfo (params) {
        service.getDoctorsinfo(params)
            .then(respone => {
                this.setData({
                    doctorinfo:respone.data.data
                })
            })
            .catch(error => {
                console.log(error)
            })
    },
    // 分享
    onShareAppMessage () {
        return {
            title: '分享的标题',
            path: '/pages/views/home/home', // 分享路径
            imageUrl: '', // 分享图片
            success: (respone) => {
                console.log(respone)
            },
            error: (error) => {
                console.log(error)
            }
        }
    }
})