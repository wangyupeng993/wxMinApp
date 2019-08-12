const app = getApp().globalData
const service = require('../../api/request/index.js')
Page({
    data: {
      enterHome: false,
      gridCol: 4,
      iconList: [{
        url: '/pages/views/InsidePages/LookingDoctor/LookingDoctor',
        icon: '../../assets/images/home/Doctors@2x.png',
        color: 'red',
        name: '找医生'
      }, {
        url: '/pages/views/InsidePages/DrugsClass/DrugsClass',
        icon: '../../assets/images/home/drug@2x.png',
        badge: 1,
        name: '找药品'
      }, {
        url: '/pages/views/InsidePages/hospital/hospital',
        icon: '../../assets/images/home/hospital@2x.png',
        color: 'yellow',
        name: '查医院'
      }, {
        url: '/pages/views/InsidePages/physician/physician',
        icon: '../../assets/images/home/cup@2x.png',
        color: 'olive',
        badge: 22,
        name: '医师讲堂'
      }],
      follow: [],
      forums: [], // 医师讲堂
      article: [] // 皮肤小知识
    },
    onLoad () {
      const doctor = wx.getStorageSync('doctor')
      const symptom = wx.getStorageSync('symptom')
      this.setData({
        doctor: doctor,
        symptom: symptom
      })
      if (doctor === '' || !doctor || doctor === null||symptom === ''||!symptom||symptom === null) {
          wx.redirectTo({
              url: '/pages/views/initPage/initPage'
          })
      }else{
          service.followDoctor()
              .then(respone => {
                  console.log(respone.data)
                  this.setData({
                      follow: respone.data.data.map(item => item)
                  })
              })
              .catch(error => {
                  console.log(error)
              })
          // 获取文章
          service.getHomeArticle()
              .then(respone => {
                  const article = respone.data.data.map(item => {
                      return {
                          id: item.articleId,
                          author: `作者：${item.articleAuthor}`,
                          title: item.articleTitle,
                          name: item.catalogName,
                          catalogId: item.catalogId,
                          image: ''
                      }
                  })
                  this.setData({article})
              })
              .catch(error => {
                  console.log(error)
              })
          service.getHomePhysician()
              .then(respone => {
                  this.setData({
                      forums: respone.data.data.map(item => item)
                  })
              })
              .catch(error => {
                  console.log(error)
              })
      }
      console.log('页面加载的时候执行，只执行一次')
    },
    onReady () {
        console.log('页面渲染完成之后执行，只执行一次')
    },
    onShow () {},
    onHide () {
        console.log('页面隐藏就是执行')
    },
    onUnload () {
        console.log('页面卸载的时候就会执行，只执行一次')
    },
    hospitaldetails (ev) {
        console.log(ev)
        /*wx.navigateTo({
            url: '/pages/views/InsidePages/HospitalInfo/HospitalInfo'
        })*/
    },
    classroom (ev) {
        console.log(ev)
        wx.navigateTo({
            url: '/pages/views/InsidePages/ClassroomInfo/ClassroomInfo'
        })
    },
    loadmore () {
        console.log('加载更多')
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
