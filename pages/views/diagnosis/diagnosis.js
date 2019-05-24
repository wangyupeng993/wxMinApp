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
        this.setData({
            openCamera: true
        })
    },
    closeCamera () {
        console.log('关闭相机')
        this.setData({
            openCamera: false
        })
    },
    // 拍摄照片
    takePhoto () {
        const CameraContext = wx.createCameraContext()
        CameraContext.takePhoto({
            quality: 'high',
            success: respone => {
                console.log(respone)
            },
            error:error => {
                console.log(error)
            }
        })
    }
})