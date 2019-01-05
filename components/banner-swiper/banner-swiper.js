import Component from '../component'

let app = getApp();

const SCOPE = '$bannerSwiper';

export default {
    /**
     * 默认参数
     */
    setDefaults() {
        return {
            circular: true, //是否采用衔接滑动
            indicatorDots: true,//是否显示画板指示点
            autoplay: false,   //是否自动播放
            imgheights: [], //所有图片的高度
            imgwidth: wx.getSystemInfoSync().screenWidth,   //图片宽度
            index: 0,  //默认
            onFinishLoad() {
            },
        }
    },

    init(opts = {}) {
       console.log(opts)
        const options = Object.assign({}, this.setDefaults(), opts);

        const component = new Component({
            scope: SCOPE,
            data: options,
            methods: {
                imageLoad: function (e) {
                    let  self =this;
                    let data = self.getComponentData();
                    //获取图片真实宽度
                    var imgwidth = e.detail.width,
                        imgheight = e.detail.height,
                        index = e.currentTarget.dataset.index;
                    //计算的高度值
                    var imgheight = 750 / (imgwidth / imgheight);
                    var imgheights = data.imgheights
                    //把每一张图片的高度记录到数组里
                    imgheights[index]=imgheight;
                    self.setData({
                        [`${SCOPE}.imgheights`]: imgheights,
                    });
                    if (index==data.imgUrls.length-1){
                        typeof options.onFinishLoad === 'function' && options.onFinishLoad();
                    }
                },
                bindchange: function (e) {
                    this.setData({[`${SCOPE}.index`]: e.detail.current});
                },
                /**
                 * 查看大图
                 * @param {String} cur 当前展示图片
                 * @param {Array}  imageList 展示的图片列表
                 */
                viewPic(e) {
                    let cur = e.currentTarget.dataset.current;
                    let urls = e.currentTarget.dataset.urls;
                    let imageList = [];
                    urls.forEach(item => {
                        imageList.push(item)
                    });
                    wx.previewImage({
                        current: cur,
                        urls: imageList,
                        fail: function() {
                            console.log('fail')
                        },
                        complete: function () {
                            console.info("点击图片了");
                        },
                    });
                },
            }
        });

        return component;
    }
}