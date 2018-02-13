//index.js
import {
    $bannerSwiper,
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
        banners: [
            "../../images/750x376.png",
            "http://oofuaem2b.bkt.clouddn.com/2017/1204/15123675220575404601.png?imageView2/1/w/750/h/376/interlace/1/q/100",
            "http://oofuaem2b.bkt.clouddn.com/2017/1204/15123675248215416547.png?imageView2/1/w/750/h/376/interlace/1/q/100",
            "http://oofuaem2b.bkt.clouddn.com/2017/1204/15123675271255150127.png?imageView2/1/w/750/h/376/interlace/1/q/100"
        ],//轮播图数据
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
    onLoad: function () {
        let self = this;
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
         * 轮播图组件
         */
        $bannerSwiper.init({
            banners:self.data.banners,
            onFinishLoad(){
                //隐藏加载logo
                self.setData({
                    isFinished: true
                })
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
        let self = this;
        self.setData({
            kw: e.detail.value
        });
    },
    //搜索确认
    confirm(e) {
        console.log(e.detail.value)
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
