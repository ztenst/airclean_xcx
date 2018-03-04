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
        menus: []
    },
    async onLoad(options) {
        /**
         * 初始化tabBar组件
         */
        $tabBar.init({tabIndex: 2});
        let res = await api.getActiveTags();
        this.setData({
            py: options.py || res.data.tags[0].py,
            tags: res.data.tags,
            filters: this.getFilters(res.data.tags, options.py || res.data.tags[0].py),
            listOpts: {
                listType: 'product',
                ToTop: 185
            },
        });
    },

    setFilterOpt(e) {
        let py = e.currentTarget.dataset.py;
        this.setData({
            py: py,
            filters: this.getFilters(this.data.tags, py)
        })
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

    showSearchInput(){

    }
});

