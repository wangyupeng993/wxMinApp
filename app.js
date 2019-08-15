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
    if (wx.canIUse('wx.getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      //监听向微信后台请求检查更新结果事件
      updateManager.onCheckForUpdate(respone => {
        if (respone.hasUpdate) {
          updateManager.onUpdateReady(respone => {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success:res => {
                if (res.confirm) {
                  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate()
                }else if (res.cancel) {
                  console.log('用户取消更新')
                }
              }
            })
          })
        }
      })
      // 新版本下载失败
      updateManager.onUpdateFailed(() => {
        wx.showModal({
          title: '已经有新版本了哟~',
          content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
        })
      })
    }
    console.log('小程序初始化，并未进入页面')
  },
  onShow () {
    console.log('小程序进入页面')
  },
  onHide () {
    console.log('小程序隐藏在后台运行')
  }
 })