import WxService from '../libs/wx-service/WxService';
import WxValidate from '../libs/wx-validate/WxValidate';
import _ from '../libs/underscore.modified';
import wxParse from '../libs/wxParse/wxParse';
import Promise from '../libs/es6-promise';
import coordtransform from'../libs/coordtransform';
import Api from '../utils/api';
import PubSub from '../libs/pubsub';

class Global{
  constructor(){
    this.WxService = new WxService;
    this._ = _;
    this.wxParse = wxParse;
    this.Promise = Promise;
    this.WxValidate = WxValidate;
    this.coordtransform = coordtransform;
    this.Api = new Api();
    this.pubsub = new PubSub();
  }
  //获取配置
  getConfig(){
    return new Promise((resolve,reject)=>{
      const app = getApp();
      var config = app.globalData.config;
      if(config){
        resolve(config);
      }else{
        app.configCallback.push(obj=>{
          resolve(obj);
        })
      }
    });
  }
  //获取用户数据
  getUser(){
    return new Promise((resolve,reject)=>{
      const app = getApp();
      var user = app.globalData.userInfo;
      if(user){
        resolve(user);
      }else{
        app.userInfoCallback.push(obj=>{
          resolve(obj)
        })
      }
    })
  }
  goLink(url){
    wx.navigateTo({
      url : url
    })
  }
  //判断权限
  checkSetting(name){
    return new Promise((resolve,reject)=>{
      this.WxService.getSetting().then(res=>{
          if (res.authSetting[name]) {
            resolve()
          }else{
            reject();
          }
      });
    })
  }
  //获取openid
  getOpenId(){
    return new Promise((resolve,reject)=>{
      var app = getApp();
      var user = app.globalData.wxUser;
      if(user){
        resolve(user);
      }else{
        app.wxUserCallback.push(obj=>{
          resolve(obj);
        })
      }
    })
  }
  //获取userInfo
  getUserInfo(){
    return new Promise((resolve,reject)=>{
      var app = getApp();
      var user = app.globalData.userInfo;
      if(user){
        resolve(user);
      }else{
        app.userInfoCallback.push(obj=>{
          resolve(obj);
        })
      }
    });
  }
  //打电话
  callPhone(phone){
    return this.WxService.makePhoneCall({
        phoneNumber : phone
    });
  }
  _fav(page) {
    var userInfo = page.data.userInfo;
    var params = {
      uid : userInfo.id,
      pid : page.options.id,
      type : 2
    };
    page.Api.addSave(params).then(obj=>{
      var title = obj == 1 ? '收藏成功' : '取消收藏成功';
      wx.showToast({
        title : title,
        icon : 'none'
      });
      page.setData({
        is_save : obj
      });
    });
  }
  //拨打电话回调
  log(data){
    this.Api.addLog(data);
  }
  showErrorMsg(title){
    wx.showToast({
      title : title,
      icon : 'none'
    });
  }
}

export default Global;
