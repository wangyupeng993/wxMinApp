Page({
    data: {
        intr: 0
    },
    onLoad () {},
    onReady () {},
    onShow () {},
    onHide () {},
    onUnload () {},
    loadmore () {},
    intrSwitch (ev) {
        const {type} = ev.currentTarget.dataset
        this.setData({
            intr: Number(type)
        })
    },
    onShareAppMessage () {}
})