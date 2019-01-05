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
    options : {
      addGlobalClass : true
    },
    data: {
        config: config,
        toast: null
    },
    ready() {
        this.data.toast = this.selectComponent('#toast');
        this.Global = app.Global;
    },
    methods: {
        goDetail(e) {
          var id = e.currentTarget.dataset.id;
          var url = '/pages/product/detail?id=' + id;
          this.Global.goLink(url);
        }
    }

})
