Component({
  options: {
    addGlobalClass: true,
  },
  properties: {},
  data: {
      cardCur: 1,
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
  attached() {},
  // 自定义事件方法
  methods: {}
})