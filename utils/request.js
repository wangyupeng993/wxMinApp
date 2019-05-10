function wxRequest(params) {
    const promise = new Promise((resolve, reject) => {
        wx.request({
            params,
            success: function(respone){
                console.log(respone)
                resolve()
            },
            fail: function(error) {
                console.log(error)
            },
            complete: function() {
                // complete
            }
        })
    })
    return promise
}

module.exports = wxRequest