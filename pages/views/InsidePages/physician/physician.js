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
        }]
    },
    onLoad () {},
    onReady () {},
    onShow () {},
    onHide () {},
    onUnload () {},
    loadmore () {},
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