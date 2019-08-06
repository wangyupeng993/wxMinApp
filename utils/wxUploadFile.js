function wxUploadFiles(params) {
    const promise = new Promise((resolve, reject) => {
        wx.uploadFile({
            ...params,
            success: respone => {
                resolve(respone)
            },
            fail: error => {
                reject(error)
            },
            complete:respone => {
                resolve(respone)
            }
        })
    })
    return promise
}
module.exports = wxUploadFiles