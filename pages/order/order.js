import {
   $toast
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
 
    this.setData({
      listOpts: {
        listType: 'order',
        ToTop: 0,
        bottom: 0,
        condition:Object.assign({}, this.data.condition, {uid:app.globalData.customInfo.id})
      },
    });
    
  },
  
  
});