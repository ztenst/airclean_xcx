import {
    $bannerSwiper, $detailContent
} from '../../components/wxcomponents'
import api from '../../common/api'
import Util from '../../common/util'

const app = getApp();

Page({
    data: {
        tabIndex: 1,
        productInfo: {},
        toast:null
    },
    onLoad(options) {
        this.setData({
            product_id: options.id,
        });
        this.setData({
            toast: this.selectComponent('#toast')
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
    addCollect(e) {
        let dataset = e.currentTarget.dataset;
        let params = {
            pid: dataset.pid,
            uid: app.globalData.customInfo.id,
        };
        api.addSave(params).then(res => {
            let json = res;
            this.data.toast.show(json.msg);
            this.setData({
                [`productInfo.is_save`]: json.data
            });
        });
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
