const service = require('../.././../api/request/index.js')
Page({
    data: {
        paylist: [],
        TotalMoney: 0,
        number: 0
    },
    onLoad (ev) {
        const {paylist} = this.data
        let {TotalMoney} = this.data
        if (ev.goods) {
            paylist.push(JSON.parse(ev.goods))
            const goods = paylist.map(item => {
                return {
                    ...item,
                    buyNumber: 1
                }
            })
            goods.forEach((item,index,array) => {
                TotalMoney += item.price*item.buyNumber
            })
            this.setData({paylist:goods,TotalMoney})
        }
    },
    onReady () {},
    onShow () {},
    onHide () {},
    onUnload () {},
    addbuyNumber (ev) {
        let {buynumber,drugid,stockcount,price} = ev.currentTarget.dataset
        let {TotalMoney} = this.data
        if (buynumber >= stockcount) return false
        buynumber++
        const goods = this.data.paylist.map(item => {
            if (item.drugId === drugid) item.buyNumber = buynumber
            return item
        })
        TotalMoney = Math.round((TotalMoney + price)*100)/100
        this.setData({paylist:goods,TotalMoney})
        console.log(goods)
    },
    reducebuyNumber (ev) {
        let {buynumber,drugid,price} = ev.currentTarget.dataset
        let {TotalMoney} = this.data
        if (buynumber <= 1) return false
        buynumber--
        console.log(TotalMoney,price)
        const goods = this.data.paylist.map(item => {
            if (item.drugId === drugid) item.buyNumber = buynumber
            return item
        })
        TotalMoney = Math.round((TotalMoney - price)* 100)/100
        this.setData({paylist:goods,TotalMoney})
        console.log(ev.currentTarget.dataset)
    },
    payunifiedOrder () {
        const {paylist} = this.data
        const orderItems = paylist.map(item => {
            return {
                itemId:item.itemId,
                itemCount:item.buyNumber
            }
        })
        service.payunifiedOrder({
            orderItems,
            contactAddress: '福建省厦门市翔安区新店镇',
            contactName: '路远',
            contactPhone:'18106969999',
            orderType: 'DRGUS'
        }).then(respone => {
            console.log(respone)
        }).catch(error => {
                console.log(error)
            })
        console.log(orderItems)
    },
    onShareAppMessage () {}
})