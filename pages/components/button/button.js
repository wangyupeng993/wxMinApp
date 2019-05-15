Component({
    options: {
        addGlobalClass: true,// 开启样式识别
    },
    // 接收自定义属性
    properties: {
        small: String, // 按钮的大小
        colour: String, // 按钮的颜色
        name: String, // 按钮的文字
        icon: String, // 按钮的图标
        round: Boolean, // 按钮是否为圆角
        textColour: String, // 字体颜色
        block: Boolean, // 是否为块元素
        disabled: Boolean, // 禁用状态
        loading: Boolean
    },
    data: {},
    // 组件初始化执行
    attached () {
        console.log(this.data)
    },
    // 自定义事件方法
    methods: {}
})