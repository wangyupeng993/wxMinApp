Component({
    options:{
        addGlobalClass: true,// 开启样式识别
    },
     // 接收自定义属性
     properties: {},
     data: {},
     // 组件初始化执行
    attached () {
        console.log(this.data)
    },
    // 自定义方法
    methods: {}
})