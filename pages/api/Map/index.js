const QQMapWX = require('../../../utils/Map/qqmap-wx-jssdk.js')
const key = 'NNQBZ-UW43U-OCVVE-2VCKL-3WO32-JEBOU'
let qqmapsdk = new QQMapWX({key});

const WXMAP = {
    search: (data = {keyword: '', location: ''}) => {
        return new Promise((resolve, reject) => {
            qqmapsdk.search({
                ...data,
                success: respone => {
                    console.log(respone.data)
                    resolve(respone)
                },
                fail: error => {
                    console.log(error)
                    reject(error)
                }
            })
        })
    },
    geocoder: (data = {address: ''}) => {
        return new Promise((resolve, reject) => {
            qqmapsdk.geocoder({
                ...data,
                success: respone => {
                    resolve(respone)
                },
                fail:error => {
                    reject(error)
                }
            })
        })
    }
}

module.exports = WXMAP
