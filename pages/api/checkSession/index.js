function checkSession () {
    const URL = 'https://m.ykangk.com'
    const promise = new Promise((resolve, reject) => {
        wx.request({
            url: `${URL}/user/doctor`,
            method: 'POST',
            header: {
                'content-type': 'application/json',
                'X-Yhealth-Authentication': wx.getStorageSync('sessionid')
            },
            dataType: 'json',
            success: respone => {
                const {code} = respone.data
                Number(code) !== 200 ? reject(respone) : resolve(respone)
            },
            fail: error => {
                reject(error)
            }

        })
    })
    return promise
}

module.exports = checkSession