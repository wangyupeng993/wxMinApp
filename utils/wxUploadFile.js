function wxUploadFiles(params) {
    const promise = new Promise((resolve, reject) => {
        wx.uploadFile({
            ...params,
            success: respone => {
                resolve(respone)
            },
            fail: error => {
                wx.showToast({
                    title: `上传失败`,
                    image: '/pages/assets/images/icon/error.png',
                    mask: false
                })
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