Component({
  options: {
    addGlobalClass: true,// 开启样式识别
  },
  // 接收自定义属性
  properties: {
    imageEffect: String
  },
  data: {
      cardCur: 0,
      swiperList: [{
          id: 0,
          type: 'image',
          url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
        }, {
          id: 1,
          type: 'image',
          url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
        }, {
          id: 2,
          type: 'image',
          url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
        }, {
          id: 3,
          type: 'image',
          url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
        }, {
          id: 4,
          type: 'image',
          url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
        }, {
          id: 5,
          type: 'image',
          url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
        }, {
          id: 6,
          type: 'image',
          url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
        }]
  },
  // 组件初始化执行
  attached() {
    this.towerSwiper('swiperList')
  },
  // 自定义事件方法
  methods: {
    cardSwiper(e) {
      this.setData({
        cardCur: e.detail.current
      })
    },
    towerSwiper(name) {
      let list = this.data[name];
      list.forEach((item, index, array) => {
        item['zIndex'] = parseInt(array.length / 2) + 1 - Math.abs(index - parseInt(array.length / 2))
        item['mLeft'] = index - parseInt(array.length / 2)
      })
      this.setData({
        swiperList: list
      })
    },
    onHandleClick (ev) {
      this.triggerEvent('handleclick', ev.currentTarget.dataset)
    }
  }
})