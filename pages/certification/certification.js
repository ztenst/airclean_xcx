import {
    $tabBar
} from '../../components/wxcomponents'
import api from '../../common/api'
import Util from '../../common/util'

let app = getApp();

Page({
    data: {},
    onLoad: function () {
        let self =this;
        /**
         * 初始化tabBar组件
         */

        $tabBar.init({
            tabIndex:4
        });
    }
});
