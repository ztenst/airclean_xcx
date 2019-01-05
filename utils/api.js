import WxRequest from '../libs/wx-request/lib/core/WxRequest';
import Promise from '../libs/es6-promise';
import config from '../config';

class Api{
  constructor(){
      this.request = new WxRequest({
          baseURL : config.host + '/api'
      });
      this.request.interceptors.use({
        //统一数据处理
        response(response){
          if(response.data.status === 'error'){
            wx.showToast({
              title : response.data.msg,
              icon : 'none'
            });
            if (response.data.msg=="请认证后操作") {
              setTimeout(function () {
                wx.navigateTo({
                  url: "/pages/my/auth"
                });
              }, 2e3);
            }
            return Promise.reject(response);
          }else{
            return response.data.data;
          }
        },
        // 统一全局拦截
        responseError(responseError) {
          wx.showToast({
            title : responseError.data.msg || responseError.data,
            icon : 'none'
          })
          return Promise.reject(responseError)
        }
      });
      this.mrequest = new WxRequest({
          baseURL : config.host + '/api'
      });
      this.mrequest.interceptors.use({
        //统一数据处理
        response(response){
          if(response.data.status === 'error'){
            wx.showToast({
              title : response.data.msg,
              icon : 'none'
            });
            return Promise.reject(response);
          }else{
            return response.data;
          }
        },
        // 统一全局拦截
        responseError(responseError) {
          wx.showToast({
            title : responseError.data.msg || responseError.data,
            icon : 'none'
          })
          return Promise.reject(responseError)
        }
      });
  }
  //全局接口
  config(){
    var url = '/index/config';
    return this.request.getRequest(url);
  }
  //首页
  index(){
    var url = '/index/index';
    return this.request.getRequest(url);
  }
  //筛选数组
  avtiveTags(){
    var url = '/tag/activeTags';
    return this.request.getRequest(url);
  }
  //商品列表页
  productList(data){
    var url = '/product/list';
    return this.request.getRequest(url,{
      data : data
    });
  }
  //商品详情页
  productInfo(data){
    var url ='/product/info';
    return this.request.getRequest(url,{
      data : data
    });
  }
  //商品拨打电话后调用接口
  addLog(data){
    var url = '/cus/addLog';
    return this.request.getRequest(url,{
      data : data
    });
  }
  //帖子分类数组
  newsTags(){
    var url = '/cus/newsTags';
    return this.request.getRequest(url);
  }
  //帖子分类数组
  newsTagsNew() {
    var url = '/cus/newsTagsNews';
    return this.request.getRequest(url);
  }
  //帖子列表
  cusList(data){
    var url = '/cus/list';
    return this.request.getRequest(url,{
      data : data
    });
  }
  //帖子详情
  cusInfo(data){
    var url = '/cus/info';
    return this.request.getRequest(url,{
      data : data
    })
  }
  //收藏
  addSave(data){
    var url = '/product/addSave';
    return this.request.getRequest(url,{
      data : data
    });
  }
  addSave1(data) {
    var url = '/cus/addSave';
    return this.request.getRequest(url, {
      data: data
    });
  }
  //改变商品状态
  productChangeStatus(data){
    var url = '/product/changeStatus';
    return this.request.getRequest(url,{
      data : data
    });
  }
  //改变帖子状态
  cusChangeStatus(data){
    var url = '/cus/changeStatus';
    return this.request.getRequest(url,{
      data : data
    });
  }
  //数据中心
  cusLogList(data){
    var url = '/cus/logList';
    return this.request.getRequest(url,{
      data : data
    });
  }
  //商品拼音接口
  productGetTagArr(data){
    var url = '/product/getTagArr';
    return this.request.getRequest(url,{
      data : data
    });
  }
  //商品字段接口
  productGetProTag(data){
    var url = '/product/getProTag';
    return this.request.getRequest(url,{
      data : data
    });
  }
  //区域接口
  areaTag(){
    var url = '/tag/area';
    return this.request.getRequest(url);
  }
  //获取认证公司信息
  getCompany(data){
    var url = '/product/getCompany';
    return this.request.getRequest(url,{
      data : data
    })
  }
  //发布商品接口
  addPro(data){
    var url = '/product/addPro';
    return this.request.postRequest(url,{
      data : data
    });
  }
  //发布帖子
  addNews(data){
    var url = '/cus/addNews';
    return this.request.postRequest(url,{
      data : data
    })
  }
  //认证接口
  completeInfo(data){
    var url = '/index/completeInfo';
    return this.request.postRequest(url,{
      data : data
    });
  }
  //设置用户信息
  setUser(userInfo){
    var url = '/index/setUser';
    return this.request.postRequest(url,{
      data : userInfo
    });
  }
  //发布评论
  addComment(data){
    var url = '/cus/addComment';
    return this.request.postRequest(url,{
      data : data
    });
  }
  //点赞
  cusAddPraise(data){
    var url = '/cus/addPraise';
    return this.request.getRequest(url,{
      data : data
    });
  }
  //认证申明
  getSm(){
    var url = '/index/getSm';
    return this.request.getRequest(url);
  }
  //设置电话号码
  setPhone(data){
    var url = '/index/setPhone';
    return this.request.getRequest(url,{
      data : data
    });
  }
  checkCanBbs(data) {
    var url = '/index/checkCanBbs';
    return this.request.getRequest(url, {
      data: data
    });
  }
  checkId(data) {
    var url = '/index/checkId';
    return this.request.getRequest(url, {
      data: data
    });
  }
  checkCanPro(data) {
    var url = '/index/checkCanPro';
    return this.request.getRequest(url, {
      data: data
    });
  }
  getInfo(data) {
    var url = '/index/getInfo';
    return this.request.getRequest(url, {
      data: data
    });
  }
  //手机号解密
  decode(data){
    var url = '/index/decode';
    return this.mrequest.postRequest(url,{
      data : data
    });
  }
  //商品标签
  getTagArr(){
    var url = '/product/getTagArr';
    return this.request.getRequest(url);
  }
}
export default Api;
