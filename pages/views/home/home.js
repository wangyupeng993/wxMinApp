const app = getApp().globalData
const abc = require('../../api/request/index.js')
Page({
    data: {},
    onLoad () {
        console.log('页面加载的时候执行，只执行一次')
        console.log(abc)
        // service.getbase64()
        //  .then(respone => {
        //      console.log(respone)
        //  })
        //  .catch(error => {
        //      console.log(error)
        //  })
    },
    onReady () {
        console.log('页面渲染完成之后执行，只执行一次')
    },
    onShow () {
        console.log('页面显示就会执行')
        console.log(abc)
    },
    onHide () {
        console.log('页面隐藏就是执行')
    },
    onUnload () {
        console.log('页面卸载的时候就会执行，只执行一次')
    }
})