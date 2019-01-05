const app = getApp();
Page({
  data:{
  },
  onSelect : function(e) {
    var dataset = e.currentTarget.dataset;
    this.Global.pubsub.emit('product-category',dataset);
    wx.navigateBack();
  },
  init : function() {
    this.Api.getTagArr().then(obj=>{
      console.log(obj);
      this.setData({
        list : obj
      });
    })
  },
  onLoad: function(options){
    this.Global = app.Global;
    this.Api = this.Global.Api;
    this.init();
  }
})
