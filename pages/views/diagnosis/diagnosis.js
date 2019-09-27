const service = require('../../api/request/index.js')
// https://yhealth.oss-cn-shenzhen.aliyuncs.com/EtotIfJYmA_wx0c2c0fbc65f996ea.o6zAJs3530sWD5ghjtJSiU0bGIYI.2DdWb9SNl9t53b8f9d97faf74a9fa16fd44226e7d87b.gif
Page({
    data: {
        checked: false,
        ImagePath: '',
        ImageFile: [],
        seeImageFile: [],
        ImageGIF: '../../assets/images/scan.png',
        openCamera: ''
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
            openCamera: 'camera'
        })
    },
    closeCamera () {
        this.setData({
            openCamera: false,
            ImagePath: '',
            seeImageFile: [],
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
                    ImageGIF:'../../assets/images/scan.png'
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
            ImageGIF: '../../assets/images/scan.png'
        })
    },
    // 继续添加图片
    takePhotoNumber () {
        let {ImageFile, ImagePath, seeImageFile} = this.data
        if (ImagePath === '' || ImagePath === null || !ImagePath) return false
        seeImageFile.push(ImagePath)
        wx.getFileSystemManager().readFile({
            filePath: ImagePath,//选择图片返回的相对路径
            encoding: 'base64',
            success: respone => {
                const imageBase64 = `${respone.data}`
                ImageFile.push(imageBase64 )
                this.setData({
                    ImageFile,
                    seeImageFile,
                    ImagePath: '',
                    ImageGIF: '../../assets/images/scan.png'
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
        let {ImageFile, ImagePath,seeImageFile} = this.data
        seeImageFile.push(ImagePath)
        wx.getFileSystemManager().readFile({
            filePath: ImagePath,//选择图片返回的相对路径
            encoding: 'base64',
            success: respone => {
                const imageBase64 = `${respone.data}`
                ImageFile.push(imageBase64 )
                this.setData({ImageFile})
                console.log(ImageFile.length,'图片文件=================================')
                wx.nextTick(() => {
                    service.skindiseaserecognize({imageBase64List: ImageFile})
                        .then(respone => {
                            const {scoreResultViewList} = respone.data.data
                            console.log(respone.data.data,'症状列表====================================')
                            wx.navigateTo({
                                url: `/pages/views/InsidePages/report/report?scoreResultViewList=${JSON.stringify(scoreResultViewList)}`,
                                success: () => {
                                    this.setData({
                                        ImagePath: '',
                                        ImageFile: [],
                                        seeImageFile: [],
                                        openCamera: false,
                                        ImageGIF: '../../assets/images/scan.png'
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
    // 查看拍摄图片
    seetakeImage () {
        this.setData({
            openCamera: 'seetake'
        })
    },
    // 退出查看照片
    exitSeeImage () {
        this.setData({
            openCamera: 'camera'
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
