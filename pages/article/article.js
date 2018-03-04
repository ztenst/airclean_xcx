//article.js
import {
    $detailContent
} from '../../components/wxcomponents'

//获取应用实例
import api from '../../common/api'
import Util from '../../common/util'

const app = getApp();

Page({
    data: {
        articleInfo: {
            id: "32",
            title: "橱柜图册",
            sub_title: "",
            author: "",
            source: "",
            type: "1",
            desc: "",
            image: "http://oofuaem2b.bkt.clouddn.com/2017/1212/1513049885678710839.png?imageView2/1/w/700/h/360/interlace/1/q/100",
            content: '<p style="text-align: center;"><img src="http://oofuaem2b.bkt.clouddn.com/2017/1212/1513049863615128070.png" style=""/></p><p style="text-align: center;">凭质保证书及京东商城发票，可享受全国联保服务（奢侈品、钟表除外；奢侈品、钟表由京东联系保修，享受法定三包售后服务），与您亲临商场选购的商品享受相同的质量保证。京东商城还为您提供具有竞争力的商品价格和运费政策，请您放心购买！ \n' +
            '注：因厂家会在没有任何提前通知的情况下更改产品包装、产地或者一些附件，本司不能确保客户收到的货物与商城图片、产地、附件说明完全一致。只能确保为原厂正货！并且保证与当时市场上同样主流新品一致。若本商城没有及时更新，请大家谅解！</p><p style="text-align: center;"><img src="http://oofuaem2b.bkt.clouddn.com/2017/1212/1513049864952489904.png" style=""/></p><p style="text-align: center;"><img src="http://oofuaem2b.bkt.clouddn.com/2017/1212/1513049868151352548.png" style=""/></p>',
            cid: "71",
            sort: "0",
            data_conf: null,
            deleted: "0",
            created: "2017-12-12",
            updated: "2017-12-12",
            status: "1",
        },
    },
    onLoad(options) {
        let self = this;


        /**
         *初始化图文详情组件
         */
        $detailContent.init('news', {
            content: this.data.articleInfo.content.trim()
        });

    },


});
