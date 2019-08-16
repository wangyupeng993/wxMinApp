const service = require('../../../api/request/index.js')
Page({
    data: {
        specs: '20ml',
        druginfo: {},
        html: '',
        intr: 0,
        commentId: ''
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
                const {drugContent} = respone.data.data
                this.setData({
                    druginfo:respone.data.data,
                    html: drugContent.replace(/<img/gi, '<img style="max-width:100%;height:auto;display:block" ')
                        .replace(/<section/g, '<div')
                        .replace(/\/section>/g, '\div>')
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
    intrSwitch (ev) {
        const {type} = ev.currentTarget.dataset
        this.setData({
            intr: Number(type)
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