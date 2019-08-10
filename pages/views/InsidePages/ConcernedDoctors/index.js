const service = require('../../../api/request/index.js')
Page({
    data:{
        tipsText: '',
        doctors: []
    },
    onLoad () {
        this.getconcernedDoctors()
    },
    onReady () {},
    onShow() {},
    onHide () {},
    onUnload () {},
    getconcernedDoctors () {
        service.getconcernedDoctors()
            .then(respone => {
                const doctors = respone.data.data.map(item => item)
                const tipsText = doctors.length > 0? '':'暂无您关注的医生......'
                this.setData({doctors,tipsText})
            })
            .catch(error => {
                console.log(error)
            })
    }
})