const app = getApp();
Page({
  data:{
    list : [],
    page : 1,
    cid : 0,
    isNeedLoadMore : 1,
    category : [{
      name : '所有帖子',
      value : 'all'
    },{
      name : '审核中',
      value : '0'
    },{
      name : '上架中',
      value : '1'
    },{
      name : '下架中',
      value : '2'
    }],
    status : 'all'
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
  showDialog : function(msg) {
    return new Promise((resolve,reject)=>{
      wx.showModal({
        title: '提示',
        content: msg,
        success (res) {
          resolve(res);
        }
      })
    })
  },
  onDown : function(e) {
    var id = e.currentTarget.dataset.id;
    this.showDialog('是否下架？').then((obj)=> {
      if(obj.confirm){
        this.Api.cusChangeStatus({
          id : id,
          status : 2
        }).then(obj=>{
          this.reset();
        })
      }
    })
  },
  onUp : function(e) {
    var id = e.currentTarget.dataset.id;
    this.showDialog('是否上架？').then(obj=>{
      if(obj.confirm){
        this.Api.cusChangeStatus({
          id : id,
          status : 1
        }).then(obj=>{
          this.reset();
        })
      }
    })
  },
  onShow : function() {
    if(this.data.isLoad){
      this.reset();
    }
  },
  changeStatus : function(e) {
    var value = e.currentTarget.dataset.value;
    this.setData({
      status : value
    });
    this.reset();
  },
  init : function() {
    return this.Global.getUserInfo().then(obj=>{
      this.setData({
        userInfo : obj
      });
    });
  },
  onEdit : function(e) {
    var id = e.currentTarget.dataset.id;
    var url = '/pages/post/post?id=' + id;
    this.Global.goLink(url);
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
      this.getList();
    }
  },
  onReachBottom : function() {
    this.loadmore();
  },
  getList: function() {
    var status = this.data.status;
    var params = {
      page : this.data.page,
      uid : this.data.userInfo.id,
      status : status
    };
    this.Api.cusList(params).then(obj=>{
      var _ = this.Global._;
      var new_obj = {
        list : _.union(obj.list,this.data.list),
        page : params.page + 1
      };
      if(obj.page >= obj.page_count){
        new_obj.isNeedLoadMore = 2;
      }
      this.setData(new_obj);
    });
  }
})
