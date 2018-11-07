const app = getApp();
Page({
  data:{
  },
  onSelect : function(e) {
    var dataset = e.currentTarget.dataset;
    this.Global.pubsub.emit('product-category',dataset);
    wx.navigateBack();
  },
  onLoad: function(options){
    this.Global = app.Global;
  }
})
