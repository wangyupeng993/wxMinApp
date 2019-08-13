const QQMapWX = require('../../../api/Map/index.js')

Page({
    data: {
        longitude: '',
        latitude: '',
        polyline: []
    },
    onLoad (ev) {
        const {latitude,longitude} = ev
        this.getdirection({latitude,longitude})
    },
    onReady () {},
    onShow () {
        console.log(this.data)
    },
    onHide () {},
    onUnload () {},
    backPrevPage () {
        wx.navigateBack(-1)
    },
    getdirection (params) {
        wx.getLocation({
            type: 'wgs84',
            altitude: true,
            success: respone => {
                const {latitude,longitude} = respone
                QQMapWX.direction({
                    from: {latitude,longitude},
                    to:params
                }).then(respone => {
                    const coors = respone.result.routes[0].polyline, pl = [],kr = 1000000;
                    for (var i = 2; i < coors.length; i++) {
                        coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
                    }
                    for (var i = 0; i < coors.length; i += 2) {
                        pl.push({ latitude: coors[i], longitude: coors[i + 1] })
                    }
                    this.setData({
                        latitude:pl[0].latitude,
                        longitude:pl[0].longitude,
                        polyline: [{
                            points: pl,
                            color: '#0081ff',
                            width: 4
                        }]
                    })
                    }).catch(error => {
                        console.log(error)
                    })
            },
            fail: error => {
                wx.showModal({
                    title: '提示',
                    content: '前往小程序设置界面，授权获取地理位置',
                    confirmText: '前往',
                    success: respone => {
                        if (respone.confirm) {
                            wx.openSetting({
                                success:(respone) => {
                                },
                                fail: (error) => {
                                }
                            })
                        } else if (respone.cancel) {
                            wx.navigateBack(-2)
                        }
                    },
                    fail: error => {}
                })
            }
        })
    }
})