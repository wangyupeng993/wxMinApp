const app = getApp().globalData
const service = require('../../api/request/index.js')
Page({
    data: {
      enterHome: false,
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
      const doctor = wx.getStorageSync('doctor')
      this.setData({
        doctor: doctor
      })
      if (doctor === '' || !doctor || doctor === null) {
          wx.redirectTo({
              url: '/pages/views/initPage/initPage'
          })
      }
      console.log('页面加载的时候执行，只执行一次')
    },
    onReady () {
        console.log('页面渲染完成之后执行，只执行一次')
    },
    onShow () {
        console.log('页面显示就会执行')
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
