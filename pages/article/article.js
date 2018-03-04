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
        articleInfo: {},

    },
    // onLoad(options) {
    //     let self = this;
    //
    //
    //     /**
    //      *初始化图文详情组件
    //      */
    //     $detailContent.init('news', {
    //         content: this.data.articleInfo.content.trim()
    //     });
    //
    // },

    onLoad(options) {
        this.setData({
            cus_id: options.id,
        });
    },
    onShow() {
        let cus_id = this.data.cus_id;
        this.getCusDetail(cus_id);
    },
    /**
     * 产品详细页数据渲染
     * @param product_id
     */
    getCusDetail(product_id) {
        api.getCusInfo({id: product_id}).then(res => {
            let json = res;
            if (json.status == 'success') {
                //设置导航条标题
                wx.setNavigationBarTitle({title: json.data.name});
                this.setData({
                    articleInfo: json.data,
                    imgUrls: json.data.images,
                });

                $detailContent.init('news', {
                    content: this.data.articleInfo.content.trim()
                });


            } else {
                wx.showToast({
                    title: json.msg,
                    icon: 'loading',
                    duration: 1000,
                })
                setTimeout(() => {
                    wx.navigateBack({
                        delta: 1
                    })
                }, 1000);
            }
        });
    },


});
