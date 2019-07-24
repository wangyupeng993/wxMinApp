//app.js
App({
  globalData: {
    //Boolean 判断小程序的API，回调，参数，组件等是否在当前版本可用
    canIUse: {
      getUserInfo: wx.canIUse('button.open-type.getUserInfo'),
      liveplayer: wx.canIUse('live-player'),
      textselectable: wx.canIUse('text.selectable'),
      contact: wx.canIUse('button.open-type.contact'),
      openBluetoothAdapter: wx.canIUse('openBluetoothAdapter'),
      getSystemInfoSync: wx.canIUse('getSystemInfoSync.return.screenWidth'),
      getSystemInfo: wx.canIUse('getSystemInfo.success.screenWidth'),
      showToast: wx.canIUse('showToast.object.image'),
      CompassChange: wx.canIUse('onCompassChange.callback.direction'),
      Request: wx.canIUse('request.object')
    }
  },
  onLaunch () {
    console.log('小程序初始化，并未进入页面')
  },
  onShow () {
    console.log('小程序进入页面')
    wx.setEnableDebug({enableDebug: true})
  },
  onHide () {
    console.log('小程序隐藏在后台运行')
  }
 })