const service = require('../../../api/request/index.js')
const checkSession = require('../../../api/checkSession/index.js')
Page({
    data: {
        navClassTab: 0,
        navTab: [],
        inDrugs: [],
        outDrugs: [],
        searchname: ''
    },
    onLoad (ev) {
        checkSession().then(async respone => {
            await this.getDrugsclass()
        }).catch(error => {
                wx.login({
                    timeout: 50000,
                    success: respone => {
                        const {code} = respone
                        wx.setStorageSync('wxcode', code)
                        service.Login({
                            jsCode: code,
                            nickname: wx.getStorageSync('getUserInfo').nickName
                        }).then(async respone => {
                                const {code} = respone.data
                                if (Number(code) === 200) {
                                    const {key} = respone.data.data
                                    await wx.setStorageSync('sessionid', key)
                                    await this.getDrugsclass()
                                }
                            }).catch(error => {})
                    },
                    fail: error => {}
                })
            })

    },
    onReady () {},
    onShow () {},
    onHide () {},
    onUnload () {},
    loadmore () {},
    getDrugsclass() {
        service.getDrugsclass()
            .then(respone => {
                const navTab = respone.data.data.map(item => item)
                this.setData({navTab,navClassTab: Number(navTab[0].catalogId)})
                this.getDrugsclasslist({catalogId:Number(navTab[0].catalogId)})
            })
            .catch(error => {
                console.log(error)
            })
    },
    getDrugsclasslist (params) {
        service.getDrugsclasslist(params)
            .then(respone => {
                const {inDrugs, outDrugs} = respone.data.data
                this.setData({inDrugs, outDrugs})
            })
            .catch(error => {
                console.log(error)
            })
    },
    SwitchNavTab (ev) {
        const {itemId} = ev.currentTarget.dataset
        if (itemId) {
            this.setData({navClassTab: itemId})
            this.getDrugsclasslist({catalogId: itemId})
        }
    },
    searchInfo (ev) {
        service.searchInOutdrugs({name: this.data.searchname})
            .then(respone => {
                const inDrugs = respone.data.data.map(item => item)
                this.setData({
                    inDrugs,
                    outDrugs: [],
                    navClassTab: 0
                })
            })
            .catch(error => {
                console.log(error)
            })
    },
    searchInputVal (ev) {
        const {value} = ev.detail
        this.setData({searchname: value})
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