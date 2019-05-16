const app = getApp().globalData
const service = require('../../api/request/index.js')
Page({
    data: {
        initChoice: {
          symptom: [],
          doctor: []
        },
        gridCol: 4,
        iconList: [{
            icon: '../../assets/images/home/Doctors@2x.png',
            color: 'red',
            name: '找医生'
          }, {
            icon: '../../assets/images/home/drug@2x.png',
            badge: 1,
            name: '找药品'
          }, {
            icon: '../../assets/images/home/hospital@2x.png',
            color: 'yellow',
            name: '查医院'
          }, {
            icon: '../../assets/images/home/cup@2x.png',
            color: 'olive',
            badge: 22,
            name: '医师讲堂'
          }]
    },
    onLoad () {
        wx.hideTabBar()
        console.log('页面加载的时候执行，只执行一次')
        // service.getbase64()
        //  .then(respone => {
        //      console.log(respone)
        //  })
    },
    onReady () {
        console.log('页面渲染完成之后执行，只执行一次')
    },
    onShow () {
        console.log(this.data.initChoice.symptom.length, '页面显示就会执行')
    },
    onHide () {
        console.log('页面隐藏就是执行')
    },
    onUnload () {
        console.log('页面卸载的时候就会执行，只执行一次')
    },
    loadmore () {
        console.log('加载更多')
    }
})