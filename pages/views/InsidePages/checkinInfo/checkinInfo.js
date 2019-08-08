const service = require('../../../api/request/index.js')
Page({
    data:{
        checkin: '',
        idCardImageBack: '', // 身份证正面照
        idCardImageFront: '',// 身份证反面照
        medicaid: '', // 是否医保
        hospitalLevel: '', // 医院等级
        hospitalLicenses: '', // 医院机构证书
        doctorLicense: '',// 医生资格证
        hospitalId: '',  // 所在医院
        workYear: '', // 从业年份
        latitude: '', // 纬度
        longitude: '', // 经度
        hospitalGrade: [{
            value: 'GRADE_1_FOR_A',
            label: '一级甲等'
        }, {
            value: 'GRADE_2_FOR_A',
            label: '二级甲等'
        }, {
            value: 'GRADE_3_FOR_A',
            label: '三级甲等'
        }, {
            value: 'GRADE_1_FOR_B',
            label: '一级乙等'
        }, {
            value: 'GRADE_2_FOR_B',
            label: '二级乙等'
        }, {
            value: 'GRADE_3_FOR_B',
            label: '三级乙等'
        }, {
            value: 'GRADE_1_FOR_C',
            label: '一级丙等'
        }, {
            value: 'GRADE_2_FOR_C',
            label: '二级丙等'
        }, {
            value: 'GRADE_3_FOR_C',
            label: '三级丙等'
        }],
        healthcare: [{
            value: 0,
            label: '是'
        }, {
            value: 1,
            label: '否'
        }]
    },
    onLoad (ev) {
        const {checkin} = ev
        this.setData({checkin})
        console.log(ev)
    },
    bindDateChange(ev) {
        console.log(ev)
    },
    chooseImage (ev) {
        const {idcard,name} = ev.currentTarget.dataset
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: (respone) => {
                // tempFilePath可以作为img标签的src属性显示图片
                let FilePath = respone.tempFilePaths[0]
                service.uploadFiles({
                    filePath: FilePath,
                    name: 'file'
                }).then(respone => {
                    const {data} = JSON.parse(respone.data)
                    if (idcard === 'idCardImageBack') {
                        this.setData({idCardImageBack:data})
                    }else if (idcard === 'idCardImageFront') {
                        this.setData({idCardImageFront:data})
                    }else if (idcard === 'hospitalLicenses'){
                        this.setData({hospitalLicenses:data})
                    }
                })
                    .catch(error => {
                        console.log(error)
                    })
            },
            fail: (error) => {}
        })
    },
    deletechooseImage (ev) {
        const {idcard} = ev.currentTarget.dataset
        if (idcard === 'idCardImageBack') {
            this.setData({idCardImageBack:''})
        }else if (idcard === 'idCardImageFront') {
            this.setData({idCardImageFront:''})
        }else if (idcard === 'hospitalLicenses'){
            this.setData({hospitalLicenses:''})
        }
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
        this.setData({medicaid: healthcare[value].label})
        console.log(ev)
    },
    hospitalformSubmit (ev) {
        const {value} = ev.detail
        const {idCardImageBack} = this.data
        console.log(ev)
    }
})