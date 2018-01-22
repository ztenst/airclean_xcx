import Component from '../component'
import api from '../../common/api'
import Util from '../../utils/util'

const SCOPE = '$searchFilter';
let timeout = null;

//取得筛选字段
function getFilterKeys() {
    return ['cid', 'kw'];
}


export default {
    /**
     * 默认参数
     */
    setDefaults() {
        return {
            /**
             * 搜索相关的初始化数据
             */
            kw: '',
            kw_input: '', //分开有的手机输入时会有重字问题
            focused: false,

            /*搜索框获得焦点*/
            onFocus() {
            },
            /*搜索框输入*/
            onInputkw() {
            },
            /*确认搜索*/
            onConfirm() {
            },
            /*清除搜索框*/
            onClearkw() {
            },
            /*搜索框失去焦点*/
            onBlur() {
            },


            /**
             * 筛选相关的初始化数据
             */
            isFinishInit: false,

            toptag_filter: [],

            filters: {},

            onFilter() {
            } //搜索回调方法


        }
    },

    assign(opts) {
        let options = Object.assign({}, this.setDefaults(), opts);
        let keys = getFilterKeys();
        let fs = {};
        keys.forEach(key => fs[key] = opts.filters[key] || '')
        options.filters = fs;
        return options;
    },
    init(opts = {}) {
        const options = this.assign(opts);
        const component = new Component({
            scope: SCOPE,
            data: options,
            methods: {
                /**
                 * 搜索相关
                 */
                //搜索得到焦点
                focus() {
                    this.setData({
                        [`${SCOPE}.focused`]: true
                    });
                    typeof options.onFocus === 'function' && options.onFocus()
                },
                //搜索输入关键字
                inputkw(e) {
                    let self = this;
                    let kw = e.detail.value;
                    this.setData({
                        [`${SCOPE}.filters.kw`]: e.detail.value
                    });
                    if (timeout) clearTimeout(timeout);
                    timeout = setTimeout(() => self.triggerFilter(), 300);

                    typeof options.onInputkw === 'function' && options.onInputkw(kw, this);

                },
                //清除关键字
                clearkw(e) {
                    this.setData({
                        [`${SCOPE}.filters.kw`]: '',
                        [`${SCOPE}.filters.kw_input`]: '',
                    });
                    this.triggerFilter();
                    typeof options.onClearkw === 'function' && options.onClearkw()
                },
                //取消搜索
                cancel() {
                    this.setData({
                        [`${SCOPE}.focused`]: false
                    });
                    typeof options.onBlur === 'function' && options.onBlur()
                },
                //确认
                confirm(e) {
                    this.cancel();
                    let kw = e.detail.value;
                    // typeof options.onConfirm === 'function' && options.onConfirm(kw);
                },


                requestOptions() {
                    let self = this;
                    let ajaxs = [];
                    let data = this.getComponentData();

                    if (data.filters.kw) {
                        self.setData({
                            [`${SCOPE}.focused`]: true,
                            [`${SCOPE}.kw`]: data.filters.kw,
                            [`${SCOPE}.kw_input`]: data.filters.kw,
                        });
                    }
                    console.log(data.toptag_filters)
                    self.setData({
                        [`${SCOPE}.toptag_filters`]: [{
                            id: '',
                            name: '全部'
                        },
                            {
                                id: "60",
                                name: "橱柜"
                            },
                            {
                                id: "61",
                                name: "衣柜"
                            },
                            {
                                id: "67",
                                name: "鞋柜"
                            },
                            {
                                id: "68",
                                name: "酒柜"
                            },
                            {
                                id: "69",
                                name: "榻榻米"
                            },
                            {
                                id: "73",
                                name: "衣帽柜"
                            },
                            {
                                id: "85",
                                name: "电视柜"
                            },
                            {
                                id: "87",
                                name: "书房柜"
                            }
                        ]
                    })
                    //获取搜索顶部的tags数据
                    // ajaxs.push(api.getCates().then(resp => {
                    //     let json = resp.data.data;
                    //     self.setData({
                    //         [`${SCOPE}.toptag_filters`]: [{
                    //             id: '',
                    //             name: '全部'
                    //         }].concat(json),
                    //     })
                    // }));

                    Promise.all(ajaxs).then(vals => {
                        self.triggerFilter();
                    })
                },

                //选中后立即搜索
                filterNow(e) {
                    this.setFilter(e)
                    this.triggerFilter();
                },


                /*设置筛选条件基础方法*/
                setFilter(e, otherParams = {}) {
                    let key = e.currentTarget.dataset.key;
                    let value = e.currentTarget.dataset.id;
                    let params = Object.assign({
                        [`${SCOPE}.filters.${key}`]: value
                    }, otherParams);
                    this.setData(params);
                },

                /*筛选最终触发事件*/
                triggerFilter() {

                    let data = this.getComponentData();
                    let filters = Object.assign({}, data.filters);

                    let params = Util.filterEmpty(filters);

                    typeof options.onFilter === 'function' && options.onFilter(params);
                }

            }
        });
        component.requestOptions();
        return component;
    }
}