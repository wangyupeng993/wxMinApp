const QQMapWX = require('../../../../utils/Map/qqmap-wx-jssdk')
const service = require('../../../api/request/index.js')
let qqmapsdk;
const key = 'NNQBZ-UW43U-OCVVE-2VCKL-3WO32-JEBOU'
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
    onLoad () {
        this.getUserLocation()
    },
    onReady () {},
    onShow () {
      this.AnimationScale();
      service.getDoctors()
          .then(respone => {
                console.log(respone.data)
            })
          .catch(error => {
                console.log(error)
            })
        wx.getSetting({
            success: (respone) => {
                if (respone.authSetting['scope.userLocation']) this.getUserLocation()
            }
        })
    },
    onUnload () {},
    backPrevPage () {
        wx.navigateBack(-1)
    },
    /*handleclick (params) {
        const {markerId} = params
        wx.navigateTo({
            url: '/pages/views/InsidePages/DoctorInfo/DoctorInfo'
        })
        console.log(markerId)
    },*/
    getUserLocation () {
        qqmapsdk = new QQMapWX({key})
        let {markers} = this.data
        wx.getLocation({
            type: 'wgs84',
            altitude: true,
            success: (respone) => {
                const {latitude,longitude} = respone
                qqmapsdk.search({
                    keyword: 'kfc',
                    location: `${latitude},${longitude}`,  //设置周边搜索中心点
                    success: (respone) => {
                        markers = respone.data.map(item => {
                            return {
                                id: item.id,
                                title: item.title,
                                latitude: item.location.lat,
                                longitude: item.location.lng,
                                iconPath: '../../../assets/images/home/user.png',
                                width: 50,
                                height: 50,
                                callout:{
                                    content: `${item.title} \n地址：${item.address} \n电话：${item.tel}`,
                                    color: '#0081ff',
                                    padding: 10,
                                    borderRadius: 6
                                }
                            }
                        })
                        this.setData({
                            markers,
                            latitude,
                            longitude
                        })
                    },
                    fail: (error) => {}
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
    lookDoctor (params) {
        const {markerId} = params
        wx.navigateTo({
            url: '/pages/views/InsidePages/DoctorInfo/DoctorInfo'
        })
        console.log(markerId)
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