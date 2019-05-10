function wxRequest(params) {
    const promise = new Promise((resolve, reject) => {
        wx.request({
            params,
            success: function(respone){
                resolve()
            },
            fail: function(error) {
                reject(error)
            },
            complete: function() {
                // complete
                resolve()
            }
        })
    })
    return promise
}

module.exports = wxRequest