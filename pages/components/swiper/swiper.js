Component({
  options: {
    addGlobalClass: true,// 开启样式识别
  },
  // 接收自定义属性
  properties: {
    imageEffect: String,
    swiperList: Array
  },
  data: {
      cardCur: 0
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