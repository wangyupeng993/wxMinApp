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
                wx.hideLoading()
                resolve(respone)
            },
            fail: function(error) {
                wx.hideLoading()
                reject(error)
            },
            complete: function() {
                wx.hideLoading()
                resolve()
            }
        })
    })
    return promise
}

module.exports = wxRequest