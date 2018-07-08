import api from '../../common/api'

let app = getApp();
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    // 弹窗标题
    title: {
      type: String,
      value: '标题' // 默认值
    },
    // 弹窗内容
    content: {
      type: String,
      value: '弹窗内容'
    },
    
    // 弹窗确认按钮文字
    confirmText: {
      type: String,
      value: '确定'
    }
  },
  
  /**
   * 组件内私有数据
   */
  data: {
    // 弹窗显示控制
    isShow: false
  },
  ready() {
    this.showDialog();
  },
  /**
   * 组件的公有方法列表
   */
  methods: {
    
    //隐藏弹框
    hideDialog() {
      this.setData({
        isShow: !this.data.isShow
      })
    },
    //展示弹框
    showDialog() {
      let _this = this;
      if (!app.globalData.hasAuthUserInfo) {
        wx.getSetting({
          success(res) {
            if (!res.authSetting['scope.userInfo']) {
              _this.setData({isShow: true});
            } else {
              app.globalData.hasAuthUserInfo = true;
              app.getUserOpenId();
            }
          }
        })
      }
    },
    /**
     * triggerEvent 组件之间通信
     */
    bindGetUserInfo(e) {
      var that = this;
      if (e.detail.userInfo) {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        app.globalData.userInfo = e.detail.userInfo;
        that.setData({isShow: false});
        app.getUserOpenId();
      } else {
        console.log(333, '执行到这里，说明拒绝了授权')
        wx.showToast({
          title: "为了您更好的体验,请先同意授权",
          icon: 'none',
          duration: 2000
        });
      }
    }
    
  }
})