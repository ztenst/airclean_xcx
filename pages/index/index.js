//index.js
import {
    $tabBar,
    $toast
} from '../../components/wxcomponents'

import api from '../../common/api'


//获取应用实例
const app = getApp();

Page({
    data: {
        kw: '',
        focused: false,
        isFinished: false,//轮播图是否加载完毕
        list:[]
    },
    onLoad () {
        /**
         * 初始化tabBar组件
         */
        $tabBar.init({
            tabIndex: 1
        });

        /**
         * 首页数据渲染
         */
        api.getIndex().then(res=>{
            let json = res.data;
            this.setData({
                index:json
            })
        });
        /**
         * 产品列表数据渲染
         */
        this.requestList();

    },

    requestList() {

        api.getProductList({'limit': 6,page:1}).then(resp => {
            let json = resp.data;
            if (json.list.length > 0) {
                this.setData({
                    list: this.data.list.concat(json.list),
                });
            }
        });
    },

    go_category(e) {
        let url = "/pages/category/category";
        if (e) {
            let dataset = e.currentTarget.dataset;
            app.goPage(url, {cid: dataset.id}, false);
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

    /**
     * 首页转发分享
     * @param res
     * @returns {{title: string, path: string}}
     */
    onShareAppMessage(res) {
        return {
            title: '贝莱橱柜',
            path: 'pages/index/index'
        }
    }


})
;
