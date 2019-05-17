const app = getApp()
Component({
    options: {
        addGlobalClass: true,// 开启样式识别
      },
    data:{
      Symptomlist: [{
        id: 1,
        name: '手上长满密集的小红点'
      },{
        id: 2,
        name: '皮疹',
        selected: false
      }, {
        id: 3,
        name: '青春痘',
        selected: false
      }, {
        id: 4,
        name: '手上长满密集的小红点',
        selected: false
      },{
        id: 5,
        name: '皮疹',
        selected: false
      },{
        id: 6,
        name: '青春痘',
        selected: false
      }],
      Doctorlist: [{
        id: 1,
        name: '主治湿疹',
        img: '../../assets/images/home/user.png',
        selected: false
      },{
        id: 2,
        name: '主治青少年内分泌失调',
        img: '../../assets/images/home/user.png',
        selected: false
      },{
        id: 3,
        name: '皮疹',
        img: '../../assets/images/home/user.png',
        selected: false
      },{
        id: 4,
        name: '青春痘',
        img: '../../assets/images/home/user.png',
        selected: false
      },{
        id: 5,
        name: '牛皮藓专家门诊',
        img: '../../assets/images/home/user.png',
        selected: false
      }]
    },
    // 组件初始化执行
    attached() {
      let [pageWidth] = [wx.getSystemInfoSync().windowWidth]
      const {symptom,doctor} = app.globalData.initPageChoice
      this.setData({
        symptom: symptom,
        doctor: doctor,
        DoctorPage: false
      })
      this.AnimationScale()
    },
    // 自定义方法
    methods: {
      // 选择症状
      getChoise (params) {
        const {symptom,Symptomlist} = this.data
        Symptomlist.forEach((item, index, array) => {
          if (item.id === params.detail.attributeValue) {
            item.selected = !item.selected
          }
        })
        wx.nextTick(() => {
          this.setData({
            Symptomlist: Symptomlist,
            symptom: Symptomlist.filter(item => item.selected === true)
          })
        })
      },
      // 选择医生
      getDustor (params) {
        const {Doctorlist,doctor} = this.data
        Doctorlist.forEach((item, index, array) => {
          if (item.id === params.detail.attributeValue) {
            item.selected = !item.selected
          }
        })
        wx.nextTick(() => {
          this.setData({
            Doctorlist: Doctorlist,
            doctor: Doctorlist.filter(item => item.selected === true)
          })
        })
      },
      // 进入医生页
      nextDoctorPage () {
        const {symptom} = this.data
        this.setData({
          DoctorPage: symptom.length >= 2
        })
      },
      nextHome () {
        const {doctor} = this.data
        this.triggerEvent('handleclick', doctor.length >= 2)
      },
      // 跳过
      jumpHome () {},
      // 症状按钮动效
      AnimationScale () {
        let [next] = [true]
        const animation = wx.createAnimation({
          duration: 600,
          timingFunction: 'linear'
        })

        setInterval(() => {
          if (next) {
            animation.scale(0.95).step()
            next = !next
          } else {
            animation.scale(1).step()
            next = !next
          }
          this.setData({
            Animation: animation.export()
          })
        },600)
      },
      AnimationStart () {},
      AnimationEnd () {}
    }
})