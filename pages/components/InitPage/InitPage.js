const app = getApp()
Component({
    options: {
        addGlobalClass: true,// 开启样式识别
      },
    data:{
      Symptomlist: ['手上长满密集的小红点', '皮疹', '青春痘', '手上长满密集的小红点', '皮疹', '青春痘']
    },
    // 组件初始化执行
    attached() {
      this.setData({
        initPageChoice: app.globalData.initPageChoice
      })
    },
    // 自定义方法
    methods: {
      getChoise (params) {
        console.log(params)
      }
    }
})