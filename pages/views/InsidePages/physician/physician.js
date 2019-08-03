const service = require('../../../api/request/index.js')
Page({
    data: {
        navClassTab: 0,
        navTab: [{
            name: '全部',
            id: 0
        },{
            name: 'Headphones',
            id: 1
        },{
            name: 'Speakers',
            id: 2
        },{
            name: 'Microphones',
            id: 3
        },{
            name: 'Headphones',
            id: 4
        },{
            name: 'Speakers',
            id: 5
        },{
            name: 'Microphones',
            id: 6
        },{
            name: 'Headphones',
            id: 7
        }],
        physician: []
    },
    onLoad () {},
    onReady () {},
    onShow () {
        this.getPhysicianclass()
        this.getPhysician({
            catalogId: 0,
            pageNo: 1,
            pageSize: 30
        })
    },
    onHide () {},
    onUnload () {},
    loadmore () {},
    getPhysicianclass () {
        service.getPhysicianclass()
            .then(respone => {
                console.log(respone.data.data)
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
        const {id} = ev.currentTarget.dataset
        this.setData({
            navClassTab: id
        })
        console.log(id)
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