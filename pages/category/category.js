import {$tabBar} from '../../components/wxcomponents'
import config from '../../config'

let app = getApp();
import api from '../../common/api';
import util from '../../common/util';
import regeneratorRuntime from '../../libs/regenerator-runtime/runtime';
import _ from '../../libs/lodash/we-lodash';

Page({
  data: {
    static_path: config.static_path,
    listOpts: {},//列表项组件参数
    searchOpts: {},//搜索组件参数
    filterOpts: {},//筛选组件参数
    condition: {},
    showSearchPanel: false,
    cidIndex: 0,
    menus: [],
    focused: false,
  },
  async onLoad(options) {
    /**
     * 初始化tabBar组件
     */
    $tabBar.init({tabIndex: 2});
    let res = await api.getActiveTags();
    this.setData({
      py: options.py || '', 
      tags: res.data.tags,
      filters: this.getFilters(res.data.tags, options.py || res.data.tags[0].py),
      listOpts: {
        listType: 'product',
        ToTop: 185,
        bottom: 98,
        condition : {
          py : options.py || ''
        }
      },
      isLoad : true
    });
  },
  
  setFilterOpt(e) {
    let py = e.currentTarget.dataset.py;
    
    this.setData({
      py: py,
      filters: this.getFilters(this.data.tags, py),
      condition: Object.assign({}, this.data.condition, {py: py}),
      [`listOpts.condition`]: Object.assign({}, {py: py}),
    });
  },
  
  getFilters(tags, py) {
    return _.find(tags, {'py': py}).filters[0];
  },
  handleCloseSearchBar(e) {
    this.setData({
      showSearchPanel: false
    });
  },
  //搜索组件和筛选组件最终触发列表组件的加载
  changeData(e) {
    this.setData({
      condition: e.detail.condition,
      [`listOpts.condition`]: e.detail.condition,
      menus: e.detail.barMenus || []
    });
  },
  //搜索得到焦点
  handleSearchBox() {
    this.setData({
      focused: !this.data.focused
    });
    if (this.data.condition.kw) {
      this.setData({
        condition: Object.assign({}, this.data.condition, {kw: ''}),
        [`listOpts.condition`]: Object.assign({}, this.data.condition, {kw: ''}),
      });
    }
  },
  onSearchInput(e) {
    this.setData({
      condition: Object.assign({}, this.data.condition, {kw: e.detail.value}),
      [`listOpts.condition`]: Object.assign({}, this.data.condition, {kw: e.detail.value}),
    });
  },
  onShareAppMessage(res) {
    return {
      title: '空气净化大师-产品列表',
      path: 'pages/category/category'
    }
  }
});

