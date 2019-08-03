Page({
    data: {
        searchVal:'',
        focus: false,
        searchtype: 'drug'
    },
    onLoad () {},
    onReady () {},
    onShow () {},
    onHide () {},
    onUnload () {},
    // input获取焦点
    searchInputfous () {
        console.log('我获取焦点了========================')
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
        console.log(ev)
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