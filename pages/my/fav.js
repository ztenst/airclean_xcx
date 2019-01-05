const app = getApp();
Page({
  data:{
    savetype : '1',
    page : 1,
    list : [],
    isNeedLoadMore : 1
  },
  onLoad: function(options){
    this.Global = app.Global;
    this.Api = this.Global.Api;
    this.init().then(obj=>{
      this.reset();
    });
  },
  init : function() {
    return this.Global.getUserInfo().then(obj=>{
      this.setData({
        userInfo : obj
      });
    });
  },
  change : function(e) {
    var type = e.currentTarget.dataset.type;
    this.setData({
      savetype : type
    },()=>{
      this.reset();
    });
  },
  goDetail : function(e) {
    var id = e.currentTarget.dataset.id;
    var url = '/pages/bbs/detail?id=' + id;
    this.Global.goLink(url);
  },
  goPDetail : function(e) {
    var id = e.currentTarget.dataset.id;
    var url = '/pages/product/detail?id=' + id;
    this.Global.goLink(url);
  },
  reset : function() {
    this.setData({
      list : [],
      page : 1,
      isNeedLoadMore : 1,
      isLoad : false
    });
    this.loadmore();

  },
  loadmore : function() {
    if(this.data.isNeedLoadMore == 1){
      this.getData().then(obj=>{
        var _ = this.Global._;
        var new_obj = {
          list : _.union(obj.list,this.data.list),
          page : this.data.page + 1,
          isLoad : true
        };
        if(obj.page >= obj.page_count){
          new_obj.isNeedLoadMore = 3;
        }
        this.setData(new_obj);
      });
    }
  },
  onReachBottom : function() {
    this.loadmore();
  },
  getData : function() {
    var savetype = this.data.savetype;
    switch(savetype){
      case '1' : 
        return this.getProduct();
      case '2' : 
        return this.getBbs();
      case '3' :
        return this.getNews();
      default:
        break;
    }
  },
  getProduct : function() {
    var userInfo = this.data.userInfo;
    return this.Api.productList({
      uid : userInfo.id,
      save : 1,
      savetype : 1,
      page : this.data.page
    })
  },
  getBbs : function() {
    var userInfo = this.data.userInfo;
    return this.Api.cusList({
      uid : userInfo.id,
      save : 1,
      savetype : 2,
      page : this.data.page
    })
  },
  getNews : function() {
    var userInfo = this.data.userInfo;
    return this.Api.cusList({
      uid : userInfo.id,
      save : 1,
      savetype : 3,
      page : this.data.page
    })
  }
})
