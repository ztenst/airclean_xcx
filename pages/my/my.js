//my.js
//获取应用实例
import {
  $tabBar
} from '../../components/wxcomponents'
import api from '../../common/api'

const app = getApp();

Page({
  /**
   * 页面初始化数据
   */
  data: {},
  
  onLoad: function () {
    let self = this;
    
    /**
     * 初始化tabBar组件
     */
    
    $tabBar.init({
      tabIndex: 4
    });
    console.log( app.globalData.userInfo)
    self.setData({
      userInfo: app.globalData.userInfo
    })
    //
    // app.getUserInfo().then(res => {
    //     self.setData({
    //         userInfo:res
    //     })
    // });
    
    
  },
  
  go_List(e) {
    let type = e.currentTarget.dataset.type, url = "";
    if (type == "customer") {
      url = "/pages/customer_manage/customer_manage";
    } else if (type == "collect") {
      url = "/pages/collect/collect";
    }
    app.goPage(url, null, false);
  },
  contactShop() {
    api.getIndexConfig().then(res => {
      let json = res.data;
      console.log(json);
      if (json.status == 'success') {
        if (json.data.phone) {
          wx.makePhoneCall({
            phoneNumber: json.data.phone
          });
        }
      }
    })
  },
  go_map() {
    let url = "/pages/map_navigator/map_navigator";
    app.goPage(url, null, false);
  }
});
