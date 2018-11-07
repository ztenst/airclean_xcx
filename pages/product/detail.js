const app = getApp()
Page({
  data:{
    tab : 0
  },
  onLoad: function(options){
    this.Global = app.Global;
    this.Api = this.Global.Api;
    this.init();
  },
  onChangeTab : function(e) {
    var tab = e.currentTarget.dataset.tab;
    this.setData({
      tab : tab
    })
  },
  onCall : function(e) {
    var phone = e.currentTarget.dataset.phone;
    this.Global.callPhone(phone).then(obj=>{
      this.Global.addLog({
        uid : this.data.userInfo.id,
        pid : this.options.id,
        type : 2
      })
    });
  },
  fav : function() {
    this.Global._fav(this);
  },
  init : function() {
    this.Global.getUserInfo().then(obj=>{
      this.setData({
        userInfo : obj
      });
      this.Api.productInfo({
        id : this.options.id,
        uid : this.data.userInfo.id
      }).then(obj=>{
        this.Global.wxParse.wxParse('_content', 'html',obj.content, this,15);
        this.setData({
          detail : obj,
          is_save : obj.is_save,
          isLoad : true
        });
      });
    })
  },
  onShareAppMessage : function() {
    var detail = this.data.detail;
    var title = detail.name;
    var id = detail.id;
    this.Global.addLog({
      pid : id,
      uid : this.data.userInfo.id,
      type : 4
    })
    return {
        title : title,
        path : '/pages/product/detail?id=' + id
    }
  }
})
