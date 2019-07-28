function wxRequest(params) {
    wx.showLoading({mask: true})
    const promise = new Promise((resolve, reject) => {
        wx.request({
            url: params.url ? params.url : '',
            method: params.method ? params.method : '',
            data: params.data,
            header: params.header ? params.header : '',
            dataType: 'json',
            success: respone => {
                const {code, message} = respone.data
                code === 200 || code === 0? wx.showToast({title: '',icon: 'none',duration: 10,mask: true}) : wx.showToast({
                    title: `${code} ${message}`,
                    image: '/pages/assets/images/icon/error.png',
                    mask: true
                })
                resolve(respone)
            },
            fail: error => {
                wx.showToast({
                    title: JSON.stringify(error),
                    icon: 'none',
                    mask: true
                })
                reject(error)
            },
            complete: params => {
                resolve(params)
            }
        })
    })
    return promise
}

module.exports = wxRequest