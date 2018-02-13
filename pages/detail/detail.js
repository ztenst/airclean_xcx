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
        productInfo: {
            id: "4",
            name: "现代简约橱柜定制",
            price: "3980.00",
            old_price: "4880.00",
            cid: "60",
            image: "2017/1204/15123681600149461659.jpg",
            shortdes: " 同城免费上门测量送货到户并安装",
            content: "<p>套餐内容：</p><p>3米地柜+3米台面+1.5米吊柜</p><p><br/></p><p>套餐配置：</p><p>门板——纳米微晶门板（颜色任选）</p><p>柜体——实木多层板（平安树E0级）</p><p>台面——1.5公分超洁亮抑菌石英石（颜色任选）</p><p>五金——进口百隆阻尼铰链</p><p>￼</p><p><br/></p>",
            data_conf: '{"field0":"59","field1":"75","field2":"77"}',
            sort: "0",
            deleted: "0",
            created: "2017-12-04",
            updated: "2017-12-04",
            status: "1",
            images: [
                "http://oofuaem2b.bkt.clouddn.com/2017/1212/1513047964904987969.png",
                "http://oofuaem2b.bkt.clouddn.com/2017/1212/1513047964463531762.png",
                "http://oofuaem2b.bkt.clouddn.com/2017/1212/1513047964144106674.png",
                "http://oofuaem2b.bkt.clouddn.com/2017/1212/1513047963663829190.png",
                "http://oofuaem2b.bkt.clouddn.com/2017/1212/1513047961989493200.png",
                "http://oofuaem2b.bkt.clouddn.com/2017/1212/1513047961462425909.png",
                "http://oofuaem2b.bkt.clouddn.com/2017/1212/1513047960979705923.png",
                "http://oofuaem2b.bkt.clouddn.com/2017/1212/1513047959952198574.png"
            ],
            is_save: 0,
            params: {
                风格标签: "现代简约",
                材质标签: "实木多层",
                尺寸标签: "3M地柜"
            }
        }
    },
    onLoad(options) {

        this.setData({
            banners: this.data.productInfo.images,
            [`productInfo.params`]:Util.objToArr( this.data.productInfo.params)//产品参数返回值格式转换
        });
        /**
         * 初始化轮播图组件
         */
        $bannerSwiper.init({
            banners: this.data.productInfo.images,
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
            content: this.data.productInfo.content.trim()
        });
    },
    onShow: function () {

    },


});
