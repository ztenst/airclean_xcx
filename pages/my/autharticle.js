const app = getApp();
Page({
  data:{
    ct: '',
  },
  init : function() {
    this.Api.getSm().then(obj=>{
      this.Global.wxParse.wxParse('_content', 'html',obj, this,20);
    })
  },
  onLoad: function(options){
    this.Global = app.Global;
    this.Api = this.Global.Api;
    this.init();
  }
})
