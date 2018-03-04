import Component from '../component'
import Util from '../../common/util'

var WxParse = require('../../libs/wxParse/wxParse.js');


export default {
    /**
     * 默认参数
     */
    setDefaults() {
        return {
            callback() {},
        }
    },
    /**
     * 渲染xnumber组件
     * @param {String} id   唯一标识
     * @param {Object} opts 配置项
     * @param {Number} opts.content 默认值
     * @param {Function} opts.callback 监听值变化的回调函数
     */
    init(id, opts = {}) {
        const SCOPE = `$detailContent.${id}`;
        const options = Object.assign({
            id,
        }, this.setDefaults(), opts);
        // 实例化组件
        const component = new Component({
            scope: SCOPE,
            data: options,
            methods: {
                updateContent(data) {
                    let self = this;
                    /**
                     * html解析示例
                     */
                    WxParse.wxParse(self.getComponentData().updateContent, 'html',data, self)

                },
            },
        });

        // 初始化时立即更新一次组件
        component.updateContent(options.content)
        return component;
    },
}