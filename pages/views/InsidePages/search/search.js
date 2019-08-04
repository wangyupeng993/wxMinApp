const service = require('../../../api/request/index.js')
Page({
    data: {
        searchVal:'',
        focus: false,
        searchtype: 'drug',
        searchResult: [],
        tipsText: ''
    },
    onLoad () {},
    onReady () {},
    onShow () {},
    onHide () {},
    onUnload () {},
    searchInfo () {
        const {searchVal, searchtype} = this.data
        if (searchVal === '') return false
        if (searchtype === 'drug') {
            service.searchdrugs({value: searchVal})
                .then(respone => {
                    const searchResult = respone.data.data.map(item => item)
                    const tipsText = searchResult.length > 0? '':'未搜索您想要的结果......'
                    this.setData({searchResult,tipsText})
                    console.log(respone.data.data)
                })
                .catch(error => {
                    console.log(error)
                })
        } else if (searchtype === 'doctor') {
            service.searchdoctors({value: searchVal})
                .then(respone => {
                    const searchResult = respone.data.data.map(item => item)
                    const tipsText = searchResult.length > 0? '':'未搜索您想要的结果......'
                    this.setData({searchResult,tipsText})
                    console.log(respone.data.data)
                })
                .catch(error => {
                    console.log(error)
                })
        }else if (searchtype === 'hospital') {

        }
    },
    // input获取焦点
    searchInputfous () {
        this.setData({
            focus: true
        })
    },
    // 获取用户输入值
    searchInputVal (ev) {
        const {value} = ev.detail
        this.setData({
            searchVal: value
        })
    },
    // 切换搜索类型
    switchsearchtype (ev) {
        const {searchType} = ev.currentTarget.dataset
        this.setData({
            searchtype: searchType
        })
    },
    loadmore () {},
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