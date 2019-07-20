const app = getApp()
const service = require('../../api/request/index.js')
Page({
    data: {
        Symptomlist: [], // 病症
        Doctorlist: [],// 医生
        symptom: [], // 选择病症
        doctor: [], // 选择医生
        userInfo: wx.getStorageSync('getUserInfo') // 用户信息
    },
    onLoad () {
        wx.getSetting({
            success: (respone) => {
                const authSetting = respone.authSetting['scope.userInfo']?respone.authSetting['scope.userInfo']:false
                this.setData({
                    authSetting: authSetting
                })
                if (authSetting) {
                    wx.getUserInfo({
                        success: (respone) => {
                            const {userInfo} =respone
                            wx.setStorageSync('getUserInfo', userInfo)
                        },
                        error: (error) => {
                            console.log(error)
                        }
                    })
                }
            },
            error: (error) => {
                console.log(error)
            }
        })
        // 获取病症
        service.getSymptoms()
            .then(respone => {
                console.log(respone)
            })
            .catch(error => {
                console.log(error)
            })
        // 获取医生
        service.getDiseases()
            .then(respone => {
                console.log(respone)
            })
            .catch(error => {
                console.log(error)
            })
    },
    onReady () {
        console.log('页面渲染完成之后执行，只执行一次')
    },
    onShow () {
        this.AnimationScale()
    },
    onHide () {
        console.log('页面隐藏就是执行')
    },
    onUnload () {
        console.log('页面卸载的时候就会执行，只执行一次')
    },
    // 获取用户授权
    getUserInfo (respone) {
        const {userInfo} = respone.detail
        wx.login({
            timeout: 50000,
            success:(res) => {
                const {code} = res
                service.Login({jsCode: code, nickname: userInfo.nickName})
                    .then(respone => {
                        const {code} = respone.data
                        if (code === 0)wx.setStorageSync('getUserInfo', userInfo)
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        })
    },
    // 选择症状
    getChoise (event) {
        const {attributeValue} = event.detail
        const {Symptomlist} = this.data
        Symptomlist.forEach((item, index, array) => {
            if (item.id === attributeValue) {
                item.selected = !item.selected
            }
        })
        wx.nextTick(() => {
            this.setData({
                Symptomlist: Symptomlist,
                symptom: Symptomlist.filter(item => item.selected === true)
            })
        })
    },
    // 选择医生
    getDustor (event) {
        const {attributeValue} = event.detail
        const {Doctorlist} = this.data
        Doctorlist.forEach((item, index, array) => {
            if (item.id === attributeValue) {
                item.selected = !item.selected
            }
        })
        wx.nextTick(() => {
            this.setData({
                Doctorlist: Doctorlist,
                doctor: Doctorlist.filter(item => item.selected === true)
            })
        })
    },
    // 进入医生页
    nextDoctorPage () {
        const {symptom} = this.data
        this.setData({
          DoctorPage: symptom.length >= 2
        })
    },
    // 进入首页
    nextHome () {
        const {doctor,symptom} = this.data
        service.saveinitPageinfo()
            .then(respone => {
                console.log(respone)
                wx.setStorageSync('doctor',doctor)
                wx.setStorageSync('symptom',symptom)
                wx.nextTick(() => {
                    if (doctor.length >= 2){
                        wx.reLaunch({
                            url: '/pages/views/home/home'
                        })
                    }
                })
            })
            .catch(error => {
                console.log(error)
            })
    },
    // 跳过
    jumpHome () {
        wx.setStorageSync('doctor',[])
        wx.setStorageSync('symptom',[])
        wx.nextTick(() => {
            wx.reLaunch({
                url: '/pages/views/home/home'
            })
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