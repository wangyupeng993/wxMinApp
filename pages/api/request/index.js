const wxRequest = require('../../../utils/request.js')
const baseURL = 'http://192.168.1.128:80'
const service = {
    getbase64: (data) => {
        return wxRequest({
            url: baseURL + '/smartmerchant/merchant/getValidCode',
            method: 'POST',
            data: data || {}
        })
    }
}
module.export = service