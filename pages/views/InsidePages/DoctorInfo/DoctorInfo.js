Page({
    data: {},
    onLoad () {},
    onReady () {},
    onShow () {},
    onUnload () {},
    loadmore () {
        console.log('加载更多')
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