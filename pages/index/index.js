//index.js
import {$tabBar} from '../../components/wxcomponents'
import api from '../../common/api'


//获取应用实例
const app = getApp();

Page({
  data: {
    kw: '',
    focused: false,
    isFinished: false,//轮播图是否加载完毕
    list: [],
    isLoad : false
  },
  onReady () {
  },
  onImageTap(e) {
    var id = e.currentTarget.dataset.id;
    // id = id.substr(1, 0);
    // console.log
    if(id.indexOf("t")!=-1){
      id = id.substr(1);
      // console.log(id);
      wx.navigateTo({
        url: '/pages/bbs/detail?id=' + id,
      });
    } else if (id.indexOf("n") != -1) {
      id = id.substr(1);
      wx.navigateTo({
        
        url: '/pages/news/detail?id=' + id,
      });
    } else {
      if (id.indexOf("p")!=-1) {
        id = id.substr(1);
        wx.navigateTo({
          url: '/pages/product/detail?id=' + id,
        });
      } else {
        if (id!='0')
        wx.navigateTo({
          url: '/pages/product/detail?id=' + e.currentTarget.dataset.id,
        });
      }
      
    }
   
  },
  onLoad() {
    /**
     * 初始化tabBar组件
     */
    this.Global = app.Global;
    this.Api = this.Global.Api;
    $tabBar.init({
      tabIndex: 1
    });
    api.getIndex().then(res => {
      let json = res.data;
      this.setData({
        index: json,
        'index.cate1' : json.cates.slice(0,8),
        'index.cate2' : json.cates.slice(8,16),
        isLoad : true
      })
    });
  },
  turnNews() {
    var url = "/pages/news/bbs";
    wx.navigateTo({
      url: url
    });
  },
  turnBbs() {
    var url = "/pages/bbs/bbs";
    wx.navigateTo({
      url: url
    });
  },
  go_category(e) {
    var url = "/pages/category/category";
    if (e) {
      let dataset = e.currentTarget.dataset;
      var py = dataset.py;
      if(py === 'xinwen'){
        var url = '/pages/news/bbs';
        wx.navigateTo({
          url : url
        });
      } else if(py === 'luntan'){
        var url = '/pages/bbs/bbs';
        wx.navigateTo({
          url : url
        });
      }else{
        app.goPage(url, {cid: dataset.id,py:dataset.py}, false);
      }
    } else {
      app.goPage(url, null, false);
    }
  },
  
  
  //搜索得到焦点
  focus() {
    this.setData({
      focused: true
    });
  },
  //设置搜索输入的关键字
  inputkw(e) {
    this.setData({
      kw: e.detail.value
    });
  },
  //搜索确认
  confirm(e) {
    let url = "/pages/category/category";
    app.goPage(url, {kw: e.detail.value}, false)
  },
  
  goDetail(e){
    var id = e.currentTarget.dataset.id;
    var url = '/pages/product/detail?id=' + id;
    this.Global.goLink(url);
  },
  goNewsDetail(e){
    var id = e.currentTarget.dataset.id;
    var url = '/pages/bbs/detail?id=' + id;
    this.Global.goLink(url);
  },
  /**
   * 首页转发分享
   * @param res
   * @returns {{title: string, path: string}}
   */
  onShareAppMessage(res) {
    return {
      title: '',
      path: 'pages/index/index'
    }
  }
  
  
})
;
