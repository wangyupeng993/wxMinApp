const app = getApp().globalData
Page({
    data: {},
    onLoad () {
        console.log('页面加载的时候执行，只执行一次')
    },
    onReady () {
        console.log('页面渲染完成之后执行，只执行一次')
    },
    onShow () {
        console.log('页面显示就会执行')
    },
    onHide () {
        console.log('页面隐藏就是执行')
    },
    onUnload () {
        console.log('页面卸载的时候就会执行，只执行一次')
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