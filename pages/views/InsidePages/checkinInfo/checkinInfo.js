const service = require('../../../api/request/index.js')
const WXMAP = require('../../../api/Map/index.js')
Page({
    data:{
        checkin: '',
        chooseImageType: '', // 上传照片类型
        idCardImageBack: '', // 身份证正面照
        idCardImageFront: '',// 身份证反面照
        medicaid: '', // 是否医保
        hospitalLevel: '', // 医院等级
        hospitalLicenses: '', // 医院机构证书
        doctorLicense: '',// 医生资格证
        doctorAcademicTitle: '', // 医生职称
        hospitalId: '',  // 所在医院
        workYear: '', // 从业年份
        logoImg: '', // 医生头像
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
        }],
        // 职称等级
        grade: [{
            value: 'DIRECTOR_PHYSICIAN',
            label: '主任医师'
        },{
            value: 'ASSISTANT_DIRECTOR_PHYSICIAN',
            label: '副主任医师'
        },{
            value: 'HOUSE_PHYSICIAN',
            label: '住院医师'
        },{
            value: 'DOCTOR_IN_CHARGE_OF_A_CASE',
            label: '主治医师'
        },{
            value: 'PHYSICIAN',
            label: '医师'
        },{
            value: 'CERTIFIED_DOCTOR',
            label: '执业医师'
        }]
    },
    onLoad (ev) {
        const {checkin} = ev
        this.setData({checkin})
        if (checkin === 'personal') {
            service.getHospitalsAll()
                .then(respone => {
                    const hospitalGrade = respone.data.data.map(item => item)
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
    // 医生从业年份
    bindDateChange(ev) {
        console.log(ev)
        const {value} = ev.detail
        this.setData({workYear: Number(value)})
    },
    // 医生选择擅长病症
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
    // 获取照片
    chooseImage (ev) {
        const {idcard,name} = ev.currentTarget.dataset
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: (respone) => {
                let FilePath = respone.tempFilePaths[0]
                this.setData({chooseImageType:idcard})
                if (idcard === 'idCardImageBack') {
                    this.setData({idCardImageBack:'../../../assets/images/loading.gif'})
                }else if (idcard === 'idCardImageFront') {
                    this.setData({idCardImageFront:'../../../assets/images/loading.gif'})
                }else if (idcard === 'hospitalLicenses'){
                    this.setData({hospitalLicenses:'../../../assets/images/loading.gif'})
                }else if (idcard === 'doctorLicense') {
                    this.setData({doctorLicense:'../../../assets/images/loading.gif'})
                }else if (idcard === 'logoImg') {
                    this.setData({logoImg:'../../../assets/images/loading.gif'})
                }
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
                    }else if (idcard === 'doctorLicense') {
                        this.setData({doctorLicense:data})
                    }else if (idcard === 'logoImg') {
                        this.setData({logoImg:data})
                    }
                }).catch(error => {
                    if (idcard === 'idCardImageBack') {
                        this.setData({idCardImageBack:''})
                    }else if (idcard === 'idCardImageFront') {
                        this.setData({idCardImageFront:''})
                    }else if (idcard === 'hospitalLicenses'){
                        this.setData({hospitalLicenses:''})
                    }else if (idcard === 'doctorLicense') {
                        this.setData({doctorLicense:''})
                    }else if (idcard === 'logoImg') {
                        this.setData({logoImg:''})
                    }
                    })
            },
            fail: (error) => {}
        })
    },
    // 删除照片
    deletechooseImage (ev) {
        const {idcard} = ev.currentTarget.dataset
        if (idcard === 'idCardImageBack') {
            this.setData({idCardImageBack:''})
        }else if (idcard === 'idCardImageFront') {
            this.setData({idCardImageFront:''})
        }else if (idcard === 'hospitalLicenses'){
            this.setData({hospitalLicenses:''})
        }else if (idcard === 'logoImg'){
            this.setData({logoImg:''})
        }else if (idcard === 'doctorLicense'){
            this.setData({doctorLicense:''})
        }
    },
    // 医院等级
    bindhospitalGrade (ev) {
        const {value} = ev.detail
        const {hospitalGrade} = this.data
        this.setData({hospitalLevel: hospitalGrade[value]})
    },
    // 医生职称
    binddoctorGrade (ev) {
        const {value} = ev.detail
        const {grade} = this.data
        this.setData({doctorAcademicTitle: grade[value]})
    },
    // 医生所在医院
    bindhospitalId (ev) {
        const {value} = ev.detail
        const {hospitalGrade} = this.data
        this.setData({hospitalId: hospitalGrade[value]})
    },
    // 是否医保
    bindPickerhealthcare (ev) {
        const {value} = ev.detail
        const {healthcare} = this.data
        this.setData({medicaid: healthcare[value]})
    },
    // 提交认证
    hospitalformSubmit (ev) {
        const {value} = ev.detail
        const address = value.hospitalAddress || value.address
        let DiseaseIds = []
        for (var item in value) {
            if (value[item] === '') {
                wx.showToast({
                    title: '信息填写不完整，请完善信息！！！',
                    image: '/pages/assets/images/icon/error.png',
                    duration: 3000
                })
                return false
            }
        }
        const {checkin,idCardImageBack,idCardImageFront,
            medicaid,hospitalLevel,hospitalLicenses,
            hospitalId,doctorAcademicTitle,doctorLicense,workYear,logoImg} = this.data
        this.data.Disease.forEach((item,index, array) => {
            if(item.selected) DiseaseIds.push(item.id)
        })
        WXMAP.geocoder({address})
            .then(respone => {
                const {location} = respone.result
                if (location) {
                    const latitude = location.lat
                    const longitude = location.lng
                    checkin === 'personal'? service.doctorsettledin({
                        idCardImageBack,idCardImageFront,
                        medicaid: medicaid.value,doctorLicense,
                        latitude,longitude,logoImg,workYear,
                        doctorAcademicTitle: doctorAcademicTitle.value,
                        skillfulDiseaseIds:DiseaseIds,
                        hospitalId: hospitalId.hospitalId,...value
                    }).then(respone => {
                        console.log(respone.data)
                    }).catch(error => {
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
                    }).catch(error => {
                        console.log(error)
                    })
                }
            })
            .catch(error => {
                console.log(error,'==================================')
            })
        console.log(ev)
    }
})