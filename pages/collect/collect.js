import {
  $tabBar, $toast
} from '../../components/wxcomponents'
import api from '../../common/api'

let app = getApp();

Page({
  data: {
    page: 0,
    max_page: 0,
    scrollTop: 100,
    requested: false, // 判断是否请求过数据, 每次重新搜索会重置
    loading: false,
    filters: {},//筛选字段
    
    listOpts: {},//列表项组件参数
    condition: {},
    listType: 'product',
    
  },
  
  onLoad() {
    let self = this;
    /**
     * 初始化tabBar组件
     */
    $tabBar.init({
      tabIndex: 4
    });
    
    this.setData({
      listOpts: {
        listType: 'product',
        ToTop: 130,
        bottom: 98,
        condition:Object.assign({}, this.data.condition, {uid:app.globalData.customInfo.id,save:1,savetype:1})
      },
    });
    
  },
  
  to_list(e) {
    let type = e.currentTarget.dataset.type;
    this.setData({listType: type})
    if (type == "product") {
      this.setData({
        [`listOpts.listType`]: type,
        [`listOpts.condition`]: Object.assign({}, this.data.condition, {uid:app.globalData.customInfo.id,save:1,savetype:1}),
      });
    } else if (type == 'bbs') {
      this.setData({
        [`listOpts.listType`]: type,
        [`listOpts.condition`]: Object.assign({}, this.data.condition, {uid:app.globalData.customInfo.id,save:1,savetype:2}),
      });
    }
  },

  
  
});