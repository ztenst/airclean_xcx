//article.js
import {
    $detailContent
} from '../../components/wxcomponents'

//获取应用实例
import api from '../../common/api'
import Util from '../../utils/util'

const app = getApp();

Page({
    data: {
        articleInfo:{},
        type:""
    },
    onLoad: function (options) {
        let self = this;
        self.setData({
            type:options.type
        })
        let apiname = options.type === 'find' ? 'getFindInfo' : 'getCaseInfo';

        api[apiname]({id: options.id}).then(res => {
            let json = res.data;
            if (json.status == 'success') {

                wx.setNavigationBarTitle({title: json.data.title});//设置导航条标题

                self.setData({
                    articleInfo: json.data,
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
     * 转发分享
     * @param res
     * @returns {{title: string, path: string}}
     */
    onShareAppMessage(res) {
        let self =this;
        return {
            title:self.data.articleInfo.title,
            path: 'pages/article/article?type='+self.data.type+'&id='+self.data.articleInfo.id
        }
    }

});
