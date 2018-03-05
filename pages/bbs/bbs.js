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
        listOpts: {},
        list: [],
    },
    onLoad() {
        $tabBar.init({
            tabIndex: 3
        });
        this.setData({
            listOpts: {
                listType: 'bbs',
                ToTop: 112
            },
        });
    },

    //键盘输入时
    onSearchInput(e) {
        var text = e.detail.value;
        this.setData({
            [`listOpts.condition.kw`]: text
        });
    },

})
;
