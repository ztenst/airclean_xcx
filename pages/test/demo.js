const app = getApp();
Page({
  data:{
  },
  onLoad: function(options){
    this.Global = app.Global;
    this.Api = this.Global.Api;
    this.Global.getConfig().then(obj=>{
      console.log(obj);
    })
    this.Api.index().then(obj=>{
      console.log(obj);
    });
    this.Api.productGetProTag({
      type : 'yj'
    }).then(obj=>{
      console.log(obj);
    })
    this.Api.areaTag().then(obj=>{
      this.setData({
        address : obj
      })
      //console.log(obj);
    })
    this.Global.getUserInfo().then(obj=>{
      this.setData({
        userInfo : obj
      });
      var data = {
        major_id : 37,
        uid : this.data.userInfo.id,
        content : '测试'
      }
      var new_obj = {};
      this.Global._.each(data,function(v,k) {
        new_obj['CommentExt[' + k + ']'] = v;
      });

      //添加评论
      this.Api.addComment(new_obj).then(obj=>{
        console.log(obj);
      });
      //点赞

      this.Api.cusAddPraise({
        cid : 1,
        uid : this.data.userInfo.id
      }).then(obj=>{
      });

      this.Api.cusInfo({
        id : 37,
        uid : this.data.userInfo.id
      }).then(obj=>{
        console.log(obj);
      })
      this.Api.getCompany({
        uid : this.data.userInfo.id
      }).then(obj=>{
        console.log(obj);
      })
    });
  }
})
