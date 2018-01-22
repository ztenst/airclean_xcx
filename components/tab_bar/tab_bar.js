import Component from '../component'

let app = getApp();

const SCOPE = '$tabBar';

export default {
    /**
     * 默认参数
     */
    setDefaults() {
        return {
            tabIndex: null,
            showMenuLi: false
        }
    },

    init(opts = {}) {
        const options = Object.assign({}, this.setDefaults(), opts);
        const component = new Component({
            scope: SCOPE,
            data: options,
            methods: {
                go_tab(e) {
                    let self = this, dataset = e.currentTarget.dataset, url = '';
                    if (dataset.index == 1) {
                        url = "/pages/index/index";
                    } else if (dataset.index == 2) {
                        url = "/pages/category/category";
                    } else if (dataset.index == 3) {
                        url = "/pages/bbs/bbs";
                    } else if (dataset.index == 4) {
                        url = "/pages/my/my";
                    }
                    app.goPage(url, null, true)
                },
                isShowMenuLi() {
                    let self = this;
                    self.setData({
                        [`${SCOPE}.showMenuLi`]: !self.getComponentData().showMenuLi
                    });
                }
            }

        });

        return component;
    }
}