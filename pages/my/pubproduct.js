const app = getApp();
Page({
  data:{
  },
  onLoad: function(options){
    this.Global = app.Global;
    this.Api = this.Global.Api;
    this.Api.checkCanPro({ uid: app.globalData.userInfo.id }).then(res => {
      let data = res;

      if (res.status === 'error') {
        wx.showToast({
          title: data.msg
        });
      }
    });
    this.init();
  },
  init : function() {
    var WxValidate = this.Global.WxValidate;
    // 验证字段的规则
    const rules = {
      name : {
        required : true
      },
      price : {
        required : true
      },
      company : {
        required : true
      },
      shortdes : {
        required : true
      },
      phone : {
        required : true,
        tel : true
      },
      content : {
        content : true
      }
    }

    // 验证字段的提示信息，若不传则调用默认的信息
    const messages = {
      name : {
        required : '请输入商品名'
      },
      price : {
        required : '请输入价格'
      },
      company : {
        required : '请输入商家'
      },
      shortdes : {
        required : '请输入一句话介绍'
      },
      phone : {
        required : '请输入手机号码',
        tel : '手机号码格式错误'
      },
      content : {
        required : '请输入商品描述'
      }
    }
    this.WxValidate = new WxValidate(rules,messages);

    this.Global.getUserInfo().then(obj=>{
      this.setData({
        userInfo : obj
      });
    });

    //如果是编辑操作
    if(this.options.id){
      this.Api.productInfo({
        id : this.options.id
      }).then(obj=>{
        obj.detail = this.Global._.extend({},obj);
        obj.isLoad = true;
        this.setData(obj);
      })
    }else{
      this.setData({
        isLoad : true
      })
    }
  },
  getTagArr : function() {
    this.Api.productGetTagArr().then(obj=>{
      console.log(obj);
    });
  },
  onSubmit : function(e) {
    var _ = this.Global._;
    if (!this.WxValidate.checkForm(e)) {
      const error = this.WxValidate.errorList[0];
      this.Global.showErrorMsg(error.msg);
      return false
    }else{
      var value = e.detail.value;
      var tags = this.getTags();
      var address = this.getAddress();
      var image = this.getImage();
      console.log(value,tags,address,image);
      var data = {...value,...tags,...image,...address};


      data.uid = this.data.userInfo.id;
      //如果是创建
      if(this.options.id){
        data.id = this.options.id;
      }

      var params = {};
      _.mapObject(data,function(v,k) {
        params['ProductExt[' + k +']'] = v;
      });
      this.Api.addPro(params).then(obj=>{
        wx.showToast({
          title: obj.msg
         });
        if (obj.status === 'error') {
          return;
        } else {
          setTimeout(function () {
            wx.navigateTo({
              url: "/pages/my/productmanage"
            });
          }, 2e3);
          
        }
        
        // wx.showToast({
        //   title : '发布成功'
        // });
        // setTimeout(function() {
        //   wx.navigateBack();
        // },2e3);
      });
      //console.log(value);
      //处理数据
    }
  },
  getTags : function() {
    var tag = this.selectComponent('#tags');
    return tag.getTags();
  },
  getAddress : function() {
    var address = this.selectComponent('#address');
    return address.getData();
  },
  getImage : function() {
    var upload = this.selectComponent('#upload');
    return upload.getData();
  },
  getTagParam : function(type) {
    this.Api.productGetTagArr({
      type : type
    }).then(obj=>{
      console.log(obj);
    })
  }
})
