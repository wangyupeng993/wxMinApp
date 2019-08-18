Page({
    data: {
        city: ['请选择','城市','地区']
    },
    onLoad () {},
    onReady () {},
    onShow () {},
    onHide () {},
    onUnload () {},
    bindRegionChange (ev) {
        this.setData({
            city: ev.detail.value
        })
    },
    onShareAppMessage () {}
})