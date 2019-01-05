const app = getApp();
Page({
  data:{
    checked : false,
    name: '',
    phone: '',
  },
  onLoad: function(options){
    this.Global = app.Global;
    this.Api = this.Global.Api;
    this.Api.checkId({ uid: app.globalData.userInfo.id });
    this.Api.getInfo({ uid: app.globalData.userInfo.id }).then(obj=>{
      this.setData({
        name: obj.name,
        phone: obj.phone
      })
    });
    this.init();
  },
  onChange : function(e) {
    this.setData({
      checked : !this.data.checked
    });
  },
  onSubmit : function(e) {
    var _ = this.Global._;
    if (!this.WxValidate.checkForm(e)) {
        const error = this.WxValidate.errorList[0];
        this.Global.showErrorMsg(error.msg);
        return false
    }else{
      var checked = this.data.checked;
      if(!checked){
        this.Global.showErrorMsg('请同意申明');
      }else{
        var value = e.detail.value;
        //处理数据
        var data = _.mapObject(value,function(v,k) {
          if(typeof v === 'object'){
            return v[0]['imageURL'];
          }else{
            return v;
          }
        })
        data['UserExt[id]'] = this.data.userInfo.id;

        this.Api.completeInfo(data).then(obj=>{
          wx.showModal({
            title : '提示',
            content : '提交成功，请等待审核。',
            showCancel : false,
            success : function() {
              wx.navigateBack();
            }
          });
        });
      }
    }
  },
  init : function() {
    var WxValidate = this.Global.WxValidate;
    // 验证字段的规则
    const rules = {
        'UserExt[name]': {
            required: true
        },
        'UserExt[phone]': {
            required: true,
            tel: true,
        },
        'UserExt[company]': {
            arrayRequired : true
        },
        'UserExt[id_pic]': {
            arrayRequired : true
        },
        'UserExt[id_pic_2]': {
            arrayRequired : true
        },
        'UserExt[licence]': {
            required: true
        },
        'UserExt[note]': {
        }
    }

    // 验证字段的提示信息，若不传则调用默认的信息
    const messages = {
        'UserExt[name]': {
            required: '输入我的真实姓名'
        },
        'UserExt[phone]': {
            required: '输入我的手机号码',
            tel: '手机号格式错误',
        },
        'UserExt[company]': {
            required: '输入我需要认证的公司名称'
        },
        'UserExt[id_pic]': {
            arrayRequired : '请上传法人身份证正面'
        },
        'UserExt[id_pic_2]': {
            arrayRequired: '请上传法人身份证反面'
        },
        'UserExt[licence]': {
            arrayRequired : '请上传营业执照'
        },
        'UserExt[note]': {
        }
    }
    this.WxValidate = new WxValidate(rules,messages);

    this.Global.getUserInfo().then(obj=>{
      this.setData({
        userInfo : obj
      });
      this.getCompany();
    })
  },
  getCompany : function() {
    this.Api.getCompany({
      uid : this.data.userInfo.id
    }).then(obj=>{
      this.setData({
        company : obj
      })
    })
  },
  goLink : function() {
    var url = '/pages/my/autharticle';
    wx.navigateTo({
      url : url
    });
  }
})
