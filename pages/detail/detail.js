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
        productInfo:{},
        tabIndex: 1,
        product_id: '',

    },
    onLoad: function (options) {
        var self = this;
        let product_id = options.id;
        self.setData({product_id: product_id});

        if(!app.globalData.wxData.uid){

            app.getUserOpenId().then(res => {
                let json = res.data;
                if(json.status=='success'){
                    app.globalData.wxData.uid = json.data;
                }else{
                    $toast.show({
                        timer: 2e3,
                        text: json.msg
                    });
                }
            });

        }

    },
    onShow: function () {
        let self = this;
        let product_id = self.data.product_id;
        self.getProductDetail(product_id);
    },
    getProductDetail(product_id) {
        let self = this;
        api.getProductInfo({id: product_id}).then(res => {
            let json = res.data;
            if (json.status == 'success') {
                wx.setNavigationBarTitle({title: json.data.name});//设置导航条标题
                json.data.params = Util.objToArr(json.data.params);//产品参数返回值格式转换

                self.setData({
                    productInfo: json.data,
                    imgUrls: json.data.images,
                });
                /**
                 * 初始化轮播图组件
                 */
                $bannerSwiper.init({
                    imgUrls:json.data.images,
                    onFinishLoad(){
                        //隐藏加载logo
                        self.setData({
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
        let self = this, dataset = e.currentTarget.dataset;
        self.setData({
            tabIndex: dataset.index
        })
    },
    /**
     * 添加收藏
     */
    addCollect() {
        let self = this;

        let params = {
            pid: self.data.product_id,
            openid: app.globalData.wxData.open_id
        }
        api.addSave(params).then(res => {
            let json = res.data;
            $toast.show({
                timer: 2e3,
                text: json.msg
            });
            if (json.status == 'success') {
                if (self.data.productInfo.is_save == 0) {
                    self.setData({
                        [`productInfo.is_save`]: 1
                    });
                } else if (self.data.productInfo.is_save == 1) {
                    self.setData({
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
        let self = this;
        return {
            title:self.data.productInfo.name,
            path: 'pages/detail/detail?id='+self.data.productInfo.id
        }
    }

});
