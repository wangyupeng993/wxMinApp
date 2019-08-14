const service = require('../../../api/request/index.js')
Page({
    data: {
      specs: '20ml',
      druginfo: {}
    },
    onLoad (ev) {
        const {drugid} = ev
        if (drugid) {
            this.setData({drugid})
            this.getDrugInfo({drugid})
        }
    },
    onReady () {},
    onShow () {},
    onHide () {},
    onUnload () {},
    loadmore () {},
    getDrugInfo (params) {
        service.getDrugInfo(params)
            .then(respone => {
                this.setData({
                    druginfo:respone.data.data
                })
                console.log(respone.data.data)
            })
            .catch(error => {
                console.log(error)
            })
    },
    drugcollect () {
        const {druginfo} = this.data
        if (druginfo.isCollect) return false
        service.drugcollect({drugId: this.data.drugid, isCollect: true})
            .then(respone => {
                console.log(respone.data)
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