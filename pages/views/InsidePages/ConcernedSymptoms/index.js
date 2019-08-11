const service = require('../../../api/request/index.js')
Page({
    data:{
        tipsText: '',
        symptoms:[]
    },
    onLoad () {},
    onReady () {},
    onShow () {
        this.getconcernedSymptoms()
    },
    onHide () {},
    onUnload () {},
    getconcernedSymptoms () {
        service.getconcernedSymptoms()
            .then(respone => {
                const symptoms = respone.data.data.map(item => item)
                const tipsText = symptoms.length > 0? '':'暂无您关注的病症......'
                this.setData({symptoms,tipsText})
                console.log(respone.data.data)
            })
            .catch(error => {
                console.log(error)
            })
    }
})