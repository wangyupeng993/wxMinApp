Page({
    data:{
        idCardImageBack: '',
        idCardImageFront: '',
        healthcareVal: '',
        hospitalTags: '',
        hospitalLicenses: '',
        hospitalGrade: [{
            value: 0,
            label: '三级甲等'
        }, {
            value: 1,
            label: '三级乙等'
        }, {
            value: 2,
            label: '三级丙等'
        }],
        healthcare: [{
            value: 0,
            label: '是'
        }, {
            value: 1,
            label: '否'
        }],
    },
    chooseImage (ev) {
        const {idcard} = ev.currentTarget.dataset
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: (respone) => {
                // tempFilePath可以作为img标签的src属性显示图片
                if (idcard === 'idCardImageBack') {
                    const idCardImageBack = respone.tempFilePaths[0]
                    this.setData({idCardImageBack})
                }else if (idcard === 'idCardImageFront') {
                    const idCardImageFront = respone.tempFilePaths[0]
                    this.setData({idCardImageFront})
                }else if (idcard === 'hospitalLicenses'){
                    const hospitalLicenses = respone.tempFilePaths[0]
                    this.setData({hospitalLicenses})
                }
            },
            fail: (error) => {}
        })
    },
    bindPickerGrade (ev) {
        const {value} = ev.detail
        const {hospitalGrade} = this.data
        this.setData({hospitalTags: hospitalGrade[value].label})
        console.log(ev.detail)
    },
    bindPickerhealthcare (ev) {
        const {value} = ev.detail
        const {healthcare} = this.data
        this.setData({healthcareVal: healthcare[value].label})
        console.log(ev)
    },
    hospitalformSubmit (ev) {
        console.log(ev)
    }
})