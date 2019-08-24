const service = require('../../api/request/index.js')
Page({
    data: {
        checked: false,
        ImagePath: '',
        ImageFile: [],
        ImageGIF: 'https://yhealth.oss-cn-shenzhen.aliyuncs.com/ZgMkGpLJHh_wx0c2c0fbc65f996ea.o6zAJs3530sWD5ghjtJSiU0bGIYI.B7QfzTT8Hlmz2d6fc9f518ca7e47b8b35993b00bc39b.gif'
    },
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
       /* wx.navigateTo({
            url: '/pages/views/InsidePages/report/report'
        })*/
        this.setData({
            openCamera: true
        })
    },
    closeCamera () {
        this.setData({
            openCamera: false,
            ImagePath: '',
            ImageFile: []
        })
    },
    checkboxChange (ev) {
        this.setData({
            checked: !this.data.checked
        })
    },
    // 拍摄照片
    takePhoto () {
        const CameraContext = wx.createCameraContext()
        CameraContext.takePhoto({
            quality: 'high',
            success: respone => {
                this.setData({
                    ImagePath: respone.tempImagePath,
                    ImageGIF:'../../assets/images/technology.png'
                })
            },
            error:error => {
                console.log(error)
            }
        })
    },
    // 重拍
    takePhotoBack () {
        this.setData({
            ImagePath: '',
            ImageGIF: 'https://yhealth.oss-cn-shenzhen.aliyuncs.com/ZgMkGpLJHh_wx0c2c0fbc65f996ea.o6zAJs3530sWD5ghjtJSiU0bGIYI.B7QfzTT8Hlmz2d6fc9f518ca7e47b8b35993b00bc39b.gif'
        })
    },
    // 继续添加图片
    takePhotoNumber () {
        let {ImageFile, ImagePath} = this.data
        if (ImagePath === '' || ImagePath === null || !ImagePath) return false
        wx.getFileSystemManager().readFile({
            filePath: ImagePath,//选择图片返回的相对路径
            encoding: 'base64',
            success: respone => {
                const imageBase64 = `${respone.data}`
                ImageFile.push(imageBase64 )
                this.setData({
                    ImageFile,
                    ImagePath: '',
                    ImageGIF: 'https://yhealth.oss-cn-shenzhen.aliyuncs.com/ZgMkGpLJHh_wx0c2c0fbc65f996ea.o6zAJs3530sWD5ghjtJSiU0bGIYI.B7QfzTT8Hlmz2d6fc9f518ca7e47b8b35993b00bc39b.gif'
                })
                wx.showToast({
                    title: `共有${ImageFile.length}张图片`,
                    icon: '../../assets/images/icon/Correct.png',
                    duration: 2000
                })
            },
            fail: error => {
                console.log(error)
            }
        })
    },
    // 确定上传图片
    takePhotoSure () {
        let {ImageFile, ImagePath} = this.data
        wx.getFileSystemManager().readFile({
            filePath: ImagePath,//选择图片返回的相对路径
            encoding: 'base64',
            success: respone => {
                const imageBase64 = `${respone.data}`
                ImageFile.push(imageBase64 )
                this.setData({ImageFile})
                wx.nextTick(() => {
                    service.skindiseaserecognize({imageBase64})
                        .then(respone => {
                            const {name} =respone.data.data
                            wx.navigateTo({
                                url: `/pages/views/InsidePages/report/report?name=${name}`,
                                success: () => {
                                    this.setData({
                                        ImagePath: '',
                                        ImageFile: [],
                                        openCamera: false,
                                        ImageGIF: 'https://yhealth.oss-cn-shenzhen.aliyuncs.com/ZgMkGpLJHh_wx0c2c0fbc65f996ea.o6zAJs3530sWD5ghjtJSiU0bGIYI.B7QfzTT8Hlmz2d6fc9f518ca7e47b8b35993b00bc39b.gif'
                                    })
                                }
                            })
                        })
                        .catch(error => {
                            console.log(error, '上传图片错误')
                        })
                })
            },
            fail: error => {
                console.log(error)
            }
        })
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
