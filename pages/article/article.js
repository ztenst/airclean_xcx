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
            product_id: options.id,
        });
    },
    onShow () {
        let product_id = this.data.product_id;
        this.getProductDetail(product_id);
    },
    /**
     * 产品详细页数据渲染
     * @param product_id
     */
    getProductDetail(product_id) {
        api.getProductInfo({id: product_id}).then(res => {
            let json = res;
            if (json.status == 'success') {
                //设置导航条标题
                wx.setNavigationBarTitle({title: json.data.name});

                this.setData({
                    productInfo: json.data,
                    imgUrls: json.data.images,
                });

                /**
                 * 初始化轮播图组件
                 */
                $bannerSwiper.init({
                    imgUrls: json.data.images,
                    onFinishLoad() {
                        //隐藏加载logo
                        this.setData({
                            isFinished: true
                        })
                    }
                });

                /**
                 *初始化图文详情组件
                 */
                $detailContent.init('news', {
                    content: json.data.content.trim()
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
