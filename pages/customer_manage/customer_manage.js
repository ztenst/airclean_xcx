//category.js
import {
    $searchFilter,
    $tabBar
} from '../../components/wxcomponents'
import config from '../../config'
import api from '../../common/api'
import Util from '../../common/util'

//获取应用实例
const app = getApp();

Page({
    data: {
        static_path: config.static_path,
        page: 0,
        max_page: 0,
        scrollTop: 100,
        requested: false, // 判断是否请求过数据, 每次重新搜索会重置
        loading: false,
        filters: {},//筛选字段
        list: [
            {
                id: "19",
                name: "简美橱柜定制",
                price: "0.00",
                old_price: "0.00",
                ts: "美式温馨，与你同享",
                image: "http://oofuaem2b.bkt.clouddn.com/2017/1212/1513049578993245266.png?imageView2/1/w/370/h/250/interlace/1/q/100"
            },
            {
                id: "18",
                name: "中式衣帽柜定制",
                price: "0.00",
                old_price: "0.00",
                ts: "用料到位，注重细节",
                image: "http://oofuaem2b.bkt.clouddn.com/2017/1212/151304945887964898.png?imageView2/1/w/370/h/250/interlace/1/q/100"
            },
            {
                id: "17",
                name: "现代简约衣帽柜定制",
                price: "0.00",
                old_price: "0.00",
                ts: "整体定制，风格统一",
                image: "http://oofuaem2b.bkt.clouddn.com/2017/1212/1513049357517656759.png?imageView2/1/w/370/h/250/interlace/1/q/100"
            },
            {
                id: "16",
                name: "中式衣柜定制",
                price: "0.00",
                old_price: "0.00",
                ts: "高档次，真材实料",
                image: "http://oofuaem2b.bkt.clouddn.com/2017/1212/1513049261327904391.png?imageView2/1/w/370/h/250/interlace/1/q/100"
            },
            {
                id: "15",
                name: "现代简约衣柜定制",
                price: "0.00",
                old_price: "0.00",
                ts: "高颜值，高性价比",
                image: "http://oofuaem2b.bkt.clouddn.com/2017/1212/1513049180972188824.png?imageView2/1/w/370/h/250/interlace/1/q/100"
            },
            {
                id: "14",
                name: "简欧衣柜定制",
                price: "0.00",
                old_price: "0.00",
                ts: "简欧风范，时尚百搭",
                image: "http://oofuaem2b.bkt.clouddn.com/2017/1212/1513049115012834490.png?imageView2/1/w/370/h/250/interlace/1/q/100"
            },
            {
                id: "13",
                name: "榻榻米定制",
                price: "0.00",
                old_price: "0.00",
                ts: "巧妙利用空间，组合高效",
                image: "http://oofuaem2b.bkt.clouddn.com/2017/1212/151304899679387292.png?imageView2/1/w/370/h/250/interlace/1/q/100"
            },
            {
                id: "12",
                name: "中式书房柜定制",
                price: "0.00",
                old_price: "0.00",
                ts: "高端大气，成功人士的选择",
                image: "http://oofuaem2b.bkt.clouddn.com/2017/1212/1513048908395603997.png?imageView2/1/w/370/h/250/interlace/1/q/100"
            },
            {
                id: "11",
                name: "现代简约书房柜定制",
                price: "0.00",
                old_price: "0.00",
                ts: "高效工作，深度品味",
                image: "http://oofuaem2b.bkt.clouddn.com/2017/1212/1513048819636540029.png?imageView2/1/w/370/h/250/interlace/1/q/100"
            },
            {
                id: "10",
                name: "现代简约鞋柜定制",
                price: "0.00",
                old_price: "0.00",
                ts: "使用便捷，实用性强",
                image: "http://oofuaem2b.bkt.clouddn.com/2017/1212/1513048627707125433.png?imageView2/1/w/370/h/250/interlace/1/q/100"
            },
            {
                id: "9",
                name: "中式酒柜定制",
                price: "0.00",
                old_price: "0.00",
                ts: "真材实料，设计出众",
                image: "http://oofuaem2b.bkt.clouddn.com/2017/1212/1513048508503326538.png?imageView2/1/w/370/h/250/interlace/1/q/100"
            },
            {
                id: "8",
                name: "现代简约酒柜定制",
                price: "0.00",
                old_price: "0.00",
                ts: "多功能储物，高颜值",
                image: "http://oofuaem2b.bkt.clouddn.com/2017/1212/1513048378826930346.png?imageView2/1/w/370/h/250/interlace/1/q/100"
            },
            {
                id: "7",
                name: "中式电视柜定制",
                price: "0.00",
                old_price: "0.00",
                ts: "拥有新中式的禅意",
                image: "http://oofuaem2b.bkt.clouddn.com/2017/1212/1513048278077291931.png?imageView2/1/w/370/h/250/interlace/1/q/100"
            },
            {
                id: "6",
                name: "现代简约电视柜定制",
                price: "0.00",
                old_price: "0.00",
                ts: "让每一晚与家人相聚的时间变得美好",
                image: "http://oofuaem2b.bkt.clouddn.com/2017/1212/1513048092018853909.png?imageView2/1/w/370/h/250/interlace/1/q/100"
            },
            {
                id: "5",
                name: "简欧衣柜系列",
                price: "398.00",
                old_price: "450.00",
                ts: "颜色款式尺寸任选",
                image: "http://oofuaem2b.bkt.clouddn.com/2017/1204/15123712047485224864.jpg?imageView2/1/w/370/h/250/interlace/1/q/100"
            },
            {
                id: "4",
                name: "现代简约橱柜定制",
                price: "3980.00",
                old_price: "4880.00",
                ts: " 同城免费上门测量送货到户并安装",
                image: "http://oofuaem2b.bkt.clouddn.com/2017/1204/15123681600149461659.jpg?imageView2/1/w/370/h/250/interlace/1/q/100"
            }
        ],
    },
    onLoad: function (query) {
        let self = this;
        /**
         * 初始化tabBar组件
         */
        $tabBar.init({
            tabIndex:2
        });

        let _q = Object.assign({}, Util.decodeKeys(query));

        self.searchFilterInit(_q, false);

    },

    /**
     * 筛选组件初始化
     * @param _q
     * @param isFinishInit
     */
    searchFilterInit(_q, isFinishInit) {
        let self = this;
        //筛选组件初始化
        $searchFilter.init({
            filters: _q, //传入筛选条件
            isFinishInit: isFinishInit,
            onFilter(filters) {

            }
        })
    },
    /**
     * 转发分享
     * @param res
     * @returns {{title: string, path: string}}
     */
    onShareAppMessage(res) {
        return {
            title:'空气净化器',
            path: 'pages/category/category'
        }
    }
});
