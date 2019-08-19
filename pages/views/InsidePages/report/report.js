Page({
    data: {
        result: ''
    },
    onLoad (ev) {
        if (ev.name) {
            this.setData({
                result: ev.name
            })
        }
    },
    onReady () {},
    onShow () {},
    onHide () {},
    onUnload () {},
    loadmore () {},
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