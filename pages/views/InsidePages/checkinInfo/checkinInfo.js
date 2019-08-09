const QQMapWX = require('../../../../utils/Map/qqmap-wx-jssdk')
const service = require('../../../api/request/index.js')
const key = 'NNQBZ-UW43U-OCVVE-2VCKL-3WO32-JEBOU'
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
        // 医院等级
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
        Disease: [], // 病症擅长列表
        // 是否医保
        healthcare: [{
            value: true,
            label: '是'
        }, {
            value: false,
            label: '否'
        }]
    },
    onLoad (ev) {
        const {checkin} = ev
        this.setData({checkin})
        if (checkin === 'personal') {
            service.getHospitalsAll()
                .then(respone => {
                    const {hospitalGrade} = respone.data.data.map(item => item)
                    this.setData({hospitalGrade})
                })
                .catch(error => {
                    console.log(error)
                })
            service.getSymptoms()
                .then(respone => {
                    console.log(respone.data.data)
                    this.setData({
                        Disease:respone.data.data.map(item => item)
                    })
                })
                .catch(error => {
                    console.log(error)
                })
        }
    },
    bindDateChange(ev) {
        const {workYear} = this.data
        const {value} = ev.detail
        this.setData({workYear: value})
    },
    getDiseaseIds(ev) {
        const {attributeValue} = ev.detail
        const {Disease} = this.data
        Disease.forEach((item, index, array) => {
            if (item.id === attributeValue) {
                item.selected = !item.selected
            }
        })
        wx.nextTick(() => {
            this.setData({Disease})
        })
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
        this.setData({hospitalLevel: hospitalGrade[value]})
        console.log(ev.detail)
    },
    bindPickerhealthcare (ev) {
        const {value} = ev.detail
        const {healthcare} = this.data
        this.setData({medicaid: healthcare[value]})
    },
    hospitalformSubmit (ev) {
        const {value} = ev.detail
        const {checkin,idCardImageBack,idCardImageFront,medicaid,hospitalLevel,hospitalLicenses} = this.data
        const qqmapsdk = new QQMapWX({key})
        console.log(value)
        qqmapsdk.geocoder({
            address: value.hospitalAddress,
            success: (respone) => {
                const {location} = respone.result
                if (location) {
                    const latitude = location.lat
                    const longitude = location.lng
                    console.log(latitude, longitude)
                    checkin === 'personal'? service.doctorsettledin()
                        .then(respone => {
                            console.log(respone.data)
                        })
                        .catch(error => {
                            console.log(error)
                        }) : service.hospitalsettledin({
                        idCardImageBack,idCardImageFront,
                        medicaid: medicaid.value,
                        latitude,longitude,
                        hospitalLevel:hospitalLevel.value,
                        hospitalLicenses: [hospitalLicenses],
                        ...value
                    }).then(respone => {
                            console.log(respone.data)
                        })
                        .catch(error => {
                            console.log(error)
                        })
                }
            },
            fail: (error) => {
                console.log(error)
            }
        })
        console.log(ev)
    }
})