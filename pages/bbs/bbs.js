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

        list: [
            {
                id: "33",
                name: "电视柜图册",
                cate: "精品",
                image: "http://oofuaem2b.bkt.clouddn.com/2017/1212/1513049967868246502.png?imageView2/1/w/700/h/360/interlace/1/q/100"
            },
            {
                id: "32",
                name: "橱柜图册",
                cate: "推荐",
                image: "http://oofuaem2b.bkt.clouddn.com/2017/1212/1513049885678710839.png?imageView2/1/w/700/h/360/interlace/1/q/100"
            },
            {
                id: "29",
                name: "榻榻米图册",
                cate: "推荐",
                image: "http://oofuaem2b.bkt.clouddn.com/2017/1212/1513049770951801174.png?imageView2/1/w/700/h/360/interlace/1/q/100"
            },
            {
                id: "31",
                name: "为什么品牌衣柜的主材...",
                cate: "新品",
                image: "http://oofuaem2b.bkt.clouddn.com/2017/1204/15123721017643872552.jpg?imageView2/1/w/700/h/360/interlace/1/q/100"
            }
        ],
    },
    onLoad: function () {
        let  self = this;
        /**
         * 初始化tabBar组件
         */
        $tabBar.init({
            tabIndex:3
        });

    },


})
;
