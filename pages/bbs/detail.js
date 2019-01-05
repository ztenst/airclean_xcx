const app = getApp();
Page({
  data:{
  },
  onLoad: function(options){
    this.Global = app.Global;
    this.Api = this.Global.Api;
    this.setData({
      toast: this.selectComponent('#toast')
    });
    this.init();
  },
  fav : function() {
    this.Global._fav1(this);
  },
  onConfirm : function(e) {
    var value = e.detail.value;
    this.postComment(value).then(obj=>{
      this.setData({
        input : ''
      });
      this.refresh();
    });
  },
  postComment : function(content) {
    var data = {
      major_id : this.options.id,
      uid : this.data.userInfo.id,
      content : content 
    }
    var new_obj = {};
    this.Global._.each(data,function(v,k) {
      new_obj['CommentExt[' + k + ']'] = v;
    });

    //添加评论
    this.Api.addComment(new_obj).then(obj=>{
      if(obj.status=='error') {
        this.data.toast.show(obj.msg);
      }
    });
  },
  onZan : function(e) {
    var cid = e.currentTarget.dataset.cid;
    this.Api.cusAddPraise({
      cid : cid,
      uid : this.data.userInfo.id
    }).then(obj=>{
      this.data.toast.show("操作成功");
      // console.log(obj)
      this.refresh();
      //var comments = this.data.detail.comments;
      //var _ = this.Global._;
      //var index = _.findIndex(comments,function(v,k) {
        //return v.id = cid;
      //});
      //comments[index]['is_praised'] = obj;
      //this.setData({
        //'detail.comments' : comments
      //});
    })
  },
  refresh : function() {
    this.Api.cusInfo({
      id : this.options.id,
      uid : this.data.userInfo.id
    }).then(obj=>{
      this.Global.wxParse.wxParse('_content', 'html',obj.content, this,20);
      this.setData({
        detail : obj,
        is_save : obj.is_save,
        isLoad : true
      });
    })
  },
  init : function() {
    this.Global.getUserInfo().then(obj=>{
      this.setData({
        userInfo : obj
      });
      this.refresh();
    });
  }
})
