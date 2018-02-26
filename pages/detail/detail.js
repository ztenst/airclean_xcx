//detail.js
import {
    $bannerSwiper, $detailContent, $toast
} from '../../components/wxcomponents'

//获取应用实例
import api from '../../common/api'
import Util from '../../utils/util'

const app = getApp();

Page({
    data: {
        tabIndex: 1,
        productInfo: {}
    },
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
            let json = res.data;
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

    /**
     *tab(产品参数和图文详情)按钮切换
     * @param e
     */
    tabFun(e) {
        let  dataset = e.currentTarget.dataset;
        this.setData({
            tabIndex: dataset.index
        })
    },
    /**
     * 添加收藏
     */
    addCollect() {

        let params = {
            pid: this.data.product_id,
            openid: app.globalData.wxData.open_id
        }
        api.addSave(params).then(res => {
            let json = res.data;
            $toast.show({
                timer: 2e3,
                text: json.msg
            });
            if (json.status == 'success') {
                if (this.data.productInfo.is_save == 0) {
                    this.setData({
                        [`productInfo.is_save`]: 1
                    });
                } else if (this.data.productInfo.is_save == 1) {
                    this.setData({
                        [`productInfo.is_save`]: 0
                    })
                }
            }
        })
    },
    /**
     * 提交订单
     * @param e
     */
    addOrder(e) {
        let dataset = e.currentTarget.dataset, url = '/pages/add_order/add_order';
        app.goPage(url, {id: dataset.id}, false);

    },
    /**
     * 联系商家
     */
    contactShop() {
        api.getIndexConfig().then(res => {
            let json = res.data;
            console.log(json);
            if (json.status == 'success') {
                if (json.data.phone) {
                    wx.makePhoneCall({
                        phoneNumber: json.data.phone
                    });
                }
            }
        })
    },

    /**
     * 产品详细页转发分享
     * @param res
     * @returns {{title: string, path: string}}
     */
    onShareAppMessage(res) {
        
        return {
            title:this.data.productInfo.name,
            path: 'pages/detail/detail?id='+this.data.productInfo.id
        }
    }

});
