import { $toast,    $searchFilter} from '../../components/wxcomponents'
import api from '../../common/api'
import Util from '../../utils/util'

let app = getApp();

Page({
    data: {

    },
    onLoad: function (query) {
        let self = this;

        let _q = Object.assign({}, Util.decodeKeys(query));

        self.searchFilterInit(_q, false);

    },

    /**
     * 筛选组件初始化
     * @param _q
     * @param isFinishInit
     */
    searchFilterInit(_q, isFinishInit) {
        let self = this;
        //筛选组件初始化
        $searchFilter.init({
            filters: _q, //传入筛选条件
            isFinishInit: isFinishInit,
            onFilter(filters) {

            }
        })
    },
});
