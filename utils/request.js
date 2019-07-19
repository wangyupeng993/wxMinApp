function wxRequest(params) {
    wx.showLoading()
    const promise = new Promise((resolve, reject) => {
        wx.request({
            url: params.url ? params.url : '',
            method: params.method ? params.method : '',
            data: params.data,
            header: params.header ? params.header : '',
            dataType: 'json',
            success: function(respone){
                const {code, message} = respone.data
                code === 0 ? wx.showToast({title: '',icon: 'none',duration: 10}) : wx.showToast({
                    title: message,
                    image: '/pages/assets/images/icon/error.png'
                })
                resolve(respone)
            },
            fail: function(error) {
                wx.showToast({
                    title: '',
                    image: '/pages/assets/images/icon/error.png'
                })
                reject(error)
            },
            complete: function() {
                resolve()
            }
        })
    })
    return promise
}

module.exports = wxRequest