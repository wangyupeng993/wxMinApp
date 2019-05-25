Page({
    data: {},
    onLoad () {
        this.CameraContext = wx.createCameraContext()
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
    openCamera () {
        wx.navigateTo({
            url: '/pages/views/InsidePages/report/report'
        })
        /*this.setData({
            openCamera: true
        })*/
    },
    closeCamera () {
        console.log('关闭相机')
        this.setData({
            openCamera: false
        })
    },
    // 拍摄照片
    takePhoto () {
        /*const CameraContext = wx.createCameraContext()
        CameraContext.takePhoto({
            quality: 'high',
            success: respone => {
                console.log(respone)
            },
            error:error => {
                console.log(error)
            }
        })*/
        /*wx.navigateTo({
            url: '/pages/views/InsidePages/report/report'
        })*/
    },
    //分享
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