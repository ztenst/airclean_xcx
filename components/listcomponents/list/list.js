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
        config: config
    },
    methods: {
        goDetail(e) {
            let dataset = e.currentTarget.dataset, url = '', params = {}, listType = this.data.listType;
            if (listType == 'product') {
                url = "/pages/detail/detail";
                params = {id: dataset.id}
            }
            app.goPage(url, params);
        }
    },

})