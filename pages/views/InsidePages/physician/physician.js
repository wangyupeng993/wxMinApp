const service = require('../../../api/request/index.js')
Page({
    data: {
        catalogId: '',
        navTab: [],
        physician: []
    },
    onLoad () {},
    onReady () {},
    onShow () {
        this.getPhysicianclass()
    },
    onHide () {},
    onUnload () {},
    loadmore () {},
    getPhysicianclass () {
        service.getPhysicianclass()
            .then(respone => {
                const navTab = respone.data.data.map(item => item)
                this.setData({navTab, catalogId: navTab[0].catalogId})
                this.getPhysician({
                    catalogId: navTab[0].catalogId,
                    pageNo: 1,
                    pageSize: 10
                })
            })
            .catch(error => {
                console.log(error)
            })
    },
    getPhysician (params) {
        service.getPhysician(params)
            .then(respone => {
                const physician = respone.data.data.map(item => item)
                this.setData({physician})
            })
            .catch(error => {
                console.log(error)
            })
    },
    SwitchNavTab (ev) {
        const {catalogid} = ev.currentTarget.dataset
        this.setData({catalogId: catalogid})
        this.getPhysician({
            catalogId: catalogid,
            pageNo: 1,
            pageSize: 10
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