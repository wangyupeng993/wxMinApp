const service = require('../../../api/request/index.js')
const WXMAP = require('../../../api/Map/index.js')
const checkSession = require('../../../api/checkSession/index.js')
Page({
    data: {
        markers: [],
        latitude: null,
        longitude: null,
        Doctorlist: [{
            id: 1,
            name: '一甲医院 主治医师',
            img: '../../assets/images/home/user.png',
            selected: false
        },{
            id: 2,
            name: '二甲医院 主治医师',
            img: '../../assets/images/home/user.png',
            selected: false
        },{
            id: 3,
            name: '三甲医院 主治医师',
            img: '../../assets/images/home/user.png',
            selected: false
        },{
            id: 4,
            name: '一甲医院 主治医师',
            img: '../../assets/images/home/user.png',
            selected: false
        },{
            id: 5,
            name: '二甲医院 主治医师',
            img: '../../assets/images/home/user.png',
            selected: false
        }]
    },
    onLoad () {},
    onReady () {},
    onShow () {
      // this.AnimationScale();
        checkSession().then(async respone => {
            await this.getUserLocation()
        }).catch(error => {
                wx.login({
                    timeout: 50000,
                    success: respone => {
                        const {code} = respone
                        wx.setStorageSync('wxcode', code)
                        service.Login({jsCode: code,nickname: wx.getStorageSync('getUserInfo').nickName})
                            .then(async respone => {
                                const {code} = respone.data
                                if (Number(code) === 200) {
                                    const {key} = respone.data.data
                                    await wx.setStorageSync('sessionid', key)
                                    await this.getUserLocation()
                                }
                            })
                            .catch(error => {})
                    },
                    fail: error => {}
                })
            })

    },
    onUnload () {},
    backPrevPage () {
        wx.navigateBack(-1)
    },
    getUserLocation () {
        let {markers} = this.data
        wx.getLocation({
            type: 'wgs84',
            altitude: true,
            success: (respone) => {
                const {latitude,longitude} = respone
                console.log(respone)
                service.getDoctors({
                    distinct: '2000',
                    latitude: latitude,
                    longitude: longitude,
                    pageNo: 1,
                    pageSize: 99
                }).then(respone => {
                    const markers = respone.data.data.map(item => {
                        return {
                            id:item.doctorId,
                            latitude: Number(item.addressLatitude),
                            longitude: Number(item.addressLongitude),
                            iconPath: item.doctorLogoUrl,
                            width: 50,
                            height: 50
                        }
                    })
                    this.setData({markers,latitude,longitude})
                    }).catch(error => {
                        console.log(error)
                    })
            },
            fail: (error) => {
                wx.showModal({
                    title: '提示',
                    content: '前往小程序设置界面，授权获取地理位置',
                    confirmText: '前往',
                    success: (respone) => {
                        if (respone.confirm) {
                            wx.openSetting({
                                success:(respone) => {},
                                fail: (error) => {}
                            })
                        } else if (respone.cancel) {
                            wx.navigateBack(-2)
                        }
                    },
                    fail: (error) => {}
                })
            }
        })
    },
    // 查看医生详情
    lookDoctor (ev) {
        const {markerId} = ev
        wx.navigateTo({
            url: `/pages/views/InsidePages/DoctorInfo/DoctorInfo?doctorid=${markerId}`
        })
    },
    // 按钮动效
    AnimationScale () {
        let [next] = [true]
        const animation = wx.createAnimation({
            duration: 600,
            timingFunction: 'linear'
        })

        setInterval(() => {
            if (next) {
                animation.scale(0.95).step()
                next = !next
            } else {
                animation.scale(1).step()
                next = !next
            }
            this.setData({
                Animation: animation.export()
            })
        },600)
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