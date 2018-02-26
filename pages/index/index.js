//index.js
import {
    $tabBar,
    $toast,
    $productList
} from '../../components/wxcomponents'

import api from '../../common/api'


//获取应用实例
const app = getApp();

Page({
    data: {
        kw: '',
        focused: false,
        cates: [
            {
                id: "1",
                name: "药剂",
                img: "../../images/icon-yao.png"
            },
            {
                id: "2",
                name: "净化器",
                img: "../../images/icon-jinghua.png"
            },
            {
                id: "3",
                name: "活性炭",
                img: "../../images/icon-huoxing.png"
            },
            {
                id: "4",
                name: "检测设备",
                img: "../../images/icon-jiance.png"
            },
            {
                id: "5",
                name: "加盟合作",
                img: "../../images/icon-jiameng.png"
            },
            {
                id: "6",
                name: "官网制作",
                img: "../../images/icon-guanwang.png"
            },
            {
                id: "7",
                name: "喷枪",
                img: "../../images/icon-penqinag.png"
            },
            {
                id: "8",
                name: "论坛",
                img: "../../images/icn-luntan.png"
            }
        ],

        short_recoms: [
            {
                pid: "6",
                img: "http://oofuaem2b.bkt.clouddn.com/2017/1212/15130770294074119857.png?imageView2/1/w/370/h/260/interlace/1/q/100"
            },
            {
                pid: "8",
                img: "http://oofuaem2b.bkt.clouddn.com/2017/1212/15130770472976423876.png?imageView2/1/w/370/h/260/interlace/1/q/100"
            }
        ],
        long_recoms: [
            {
                pid: "19",
                img: "http://oofuaem2b.bkt.clouddn.com/2017/1212/15130770618322416653.png?imageView2/1/w/750/h/260/interlace/1/q/100"
            }
        ],
        isFinished: false,//轮播图是否加载完毕

        page: 0,
        max_page: 0,
        scrollTop: 100,
        requested: false, // 判断是否请求过数据, 每次重新搜索会重置
        loading: false,
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
         * 初始化产品列表组件
         */
        $productList.init();
        /**
         * 首页数据渲染
         */
        api.getIndex().then(res=>{
            let json = res.data.data;
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

        let state = this.data;
        if (state.loading) return;
        if (state.requested && state.page >= state.max_page) return;

        this.setData({
            loading: true,
            page: state.page + 1
        });

        let params = Object.assign({'limit': 6}, {page: this.data.page});

        api.getProductList(params).then(resp => {
            let json = resp.data;
            let list = json.data.list;
            if (json.data.page_count > 0 && list.length > 0) {
                //requested 和loading要和数据一起设置, 否则会有极短时间显示出"无数据"
                this.setData({
                    requested: true,
                    loading: false,
                    max_page: json.data.page_count,
                    list: state.list.concat(list),
                });

            } else {
                this.setData({
                    requested: true,
                    loading: false,
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

    go_detail(e) {
        let dataset = e.currentTarget.dataset, url = "/pages/detail/detail";
        app.goPage(url, {id: dataset.id}, false);
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
