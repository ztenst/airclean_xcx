//find.js
import {
    $tabBar
} from '../../components/wxcomponents'
import config from '../../config'
import api from '../../common/api'

//获取应用实例
const app = getApp();

Page({
    data: {
        listOpts: {},
        list: [],
        isNeedLoadMore: 1,
        page : 1,
        cid : 0
    },
    onLoad() {
        this.Global = app.Global;
        this.Api = this.Global.Api;
        $tabBar.init({
            tabIndex: 3
        });
        this.setData({
            listOpts: {
                listType: 'bbs',
                ToTop: 112
            },
        });
        this.init();
    },
    
    //键盘输入时
    onSearchInput(e) {
        var text = e.detail.value;
        this.setData({
            [`listOpts.condition.kw`]: text
        });
    },
    //帖子分类
    getNewsTag(){
      return this.Api.newsTags();
    },
    getData : function() {
      var params = {
        page : this.data.page,
        cid : this.data.cid,
        type : 2
      };
      this.Api.cusList(params).then(obj=>{
        var _ = this.Global._;
        var new_obj = {
          list : _.union(obj.list,this.data.list),
          page : params.page + 1
        };
        if(obj.page >= obj.page_count){
          new_obj.isNeedLoadMore = 2;
        }
        this.setData(new_obj);
      })
    },
    goDetail : function(e) {
      var id = e.currentTarget.dataset.id;
      var url = '/pages/bbs/detail?id=' + id;
      this.Global.goLink(url);
    },
    changeCid : function(e) {
      var cid = e.currentTarget.dataset.cid || 0;
      this.setData({
        cid : cid
      });
      this.reset();
    },
    reset : function() {
      this.setData({
        list : [],
        page : 1,
        isNeedLoadMore : 1
      });
      this.loadmore();
    },
    loadmore : function() {
      if(this.data.isNeedLoadMore == 1){
        this.getData();
      }
    },
    init : function() {
      this.getNewsTag().then(obj=>{
        this.setData({
          newsTags : obj
        });
      });
      this.reset();
    },
    onReachBottom : function() {
      this.loadmore();
    }
})
;
