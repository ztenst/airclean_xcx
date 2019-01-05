const app = getApp();
Page({
  data:{
    type : 1,
    utype : 1,
    typeList : [{
      name : '浏览',
      value : 1
    },{
      name : '联系',
      value : 2
    },{
      name : '收藏',
      value : 3
    },{
      name : '分享',
      value : 4
    }],
    list : [],
    isNeedLoadMore : 1,
    page : 1,
    list : []
  },
  changeType : function(e) {
    var type = e.currentTarget.dataset.type;
    this.setData({
      type : type
    })
    this.reset();
  },
  changeuType : function(e) {
    var utype = e.currentTarget.dataset.utype;
    this.setData({
      utype : utype
    });
    this.reset();
  },
  onLoad: function(options){
    this.Global = app.Global;
    this.Api = this.Global.Api;
    this.init().then(obj=>{
      this.setData({
        isLoad : true
      })
      this.reset();
    });
  },
  init : function() {
    return this.Global.getUserInfo().then(obj=>{
      this.setData({
        userInfo : obj
      });
    })
  },
  reset : function() {
    this.setData({
      list : [],
      page : 1,
      isNeedLoadMore : 1
    });
    this.loadmore();
  },
  loadmore : function() {
    if(this.data.isNeedLoadMore == 1){
      this.getData();
    }
  },
  onReachBottom : function() {
    this.loadmore();
  },
  getData : function() {
    this.Api.cusLogList({
      type : this.data.type,
      utype : this.data.utype,
      uid : this.data.userInfo.id
    }).then(obj=>{
      console.log(obj);
      this.setData({
        list : obj
      });
      this.setData({
        isNeedLoadMore : 2
      })
    })
  }
})
