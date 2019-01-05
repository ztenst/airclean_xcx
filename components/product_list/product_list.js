import Component from '../component'
let app = getApp();

const SCOPE = '$productList';

export default {
    /**
     * 默认参数
     */
    setDefaults() {
        return {}
    },
    goDetail : function(e) {
      var id = e.currentTarget.dataset.id;
      console.log(id);
    },
    init(opts = {}) {
        const options = Object.assign({}, this.setDefaults(), opts);

        const component = new Component({
            scope: SCOPE,
            data: options,
            methods: {
                navigateDetail(e) {
                    let dataset = e.currentTarget.dataset;
                    let url = '/pages/detail/detail?id=' + dataset.id;
                    app.goPage(url, null, false);
                }
            }
        });
        return component;
    }
}
