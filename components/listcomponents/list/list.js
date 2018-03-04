import api from '../../../common/api';
import config from '../../../config'

let app = getApp();
Component({
    properties: {
        listType: {
            type: String,
            value: '',
        },
        listData: {
            type: Array,
            value: null,
        },
        listOthers: {
            type: Object,
            value: {},
        }
    },
    data: {
        config: config,
        toast: null
    },
    ready() {
        this.data.toast = this.selectComponent('#toast');
    },
    methods: {
        goDetail(e) {
            let dataset = e.currentTarget.dataset, url = '', params = {}, listType = this.data.listType;
            if (listType == 'product') {
                url = "/pages/detail/detail";
                params = {id: dataset.id}
            } else if (listType == 'bbs') {
                url = "/pages/article/article";
                params = {id: dataset.id}
            }
            app.goPage(url, params);
        },
        handleDianZan(e) {
            let params = {
                cid: e.currentTarget.dataset.cid,
                uid: app.globalData.customInfo.id,
            };
            api.addPraise(params).then(res => {
                let json = res;
                this.data.toast.show(json.msg)
            })
        },
        handleCollect(e) {
            let params = {
                pid: e.currentTarget.dataset.pid,
                uid: app.globalData.customInfo.id,
            };
            api.addSave(params).then(res => {
                let json = res;
                this.data.toast.show(json.msg);
            })
        },
    },

})