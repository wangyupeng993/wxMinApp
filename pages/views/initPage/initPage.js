const app = getApp()
Page({
    data: {
        Symptomlist: [{
            id: 1,
            name: '手上长满密集的小红点'
        },{
            id: 2,
            name: '皮疹',
            selected: false
        }, {
            id: 3,
            name: '青春痘',
            selected: false
        }, {
            id: 4,
            name: '手上长满密集的小红点',
            selected: false
        },{
            id: 5,
            name: '皮疹',
            selected: false
        },{
            id: 6,
            name: '青春痘',
            selected: false
        }],
        Doctorlist: [{
            id: 1,
            name: '主治湿疹',
            img: '../../assets/images/home/user.png',
            selected: false
        },{
            id: 2,
            name: '主治青少年内分泌失调',
            img: '../../assets/images/home/user.png',
            selected: false
        },{
            id: 3,
            name: '皮疹',
            img: '../../assets/images/home/user.png',
            selected: false
        },{
            id: 4,
            name: '青春痘',
            img: '../../assets/images/home/user.png',
            selected: false
        },{
            id: 5,
            name: '牛皮藓专家门诊',
            img: '../../assets/images/home/user.png',
            selected: false
        }]
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
    },
    onReady () {
        console.log('页面渲染完成之后执行，只执行一次')
    },
    onShow () {
        const {symptom,doctor} = app.globalData.initPageChoice
        this.setData({
            symptom: symptom,
            doctor: doctor
        })
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
        wx.setStorageSync('getUserInfo', userInfo)
        this.setData({
            authSetting: userInfo === undefined?false:true
        })
    },
    // 选择症状
    getChoise (event) {
        const {attributeValue} = event.detail
        const {symptom,Symptomlist} = this.data
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
        console.log(event)
        const {attributeValue} = event.detail
        const {Doctorlist,doctor} = this.data
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
        const {doctor} = this.data
        wx.setStorageSync('doctor',doctor)
        wx.nextTick(() => {
            if (doctor.length >= 2){
                wx.reLaunch({
                    url: '/pages/views/home/home'
                })
            }
        })
    },
    // 跳过
    jumpHome () {
        wx.setStorageSync('doctor','跳过')
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
})