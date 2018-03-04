let app = getApp();
let config = {};
module.exports = {
    'xf': {
        'filterOpts': {
            showFilterBar: true,
            ToTop: 90,
            menuOpts: [{
                'name': '区域',
                'label': '区域',
                'tag': 'area',
                'key': 'xfarea',
                'value': '',
                'index': 0,
                'selectIndex': 0,
                'optionStyle': 'two-column'
            }, {
                'name': '价格',
                'label': '价格',
                'tag': 'xinfangjiage',
                'value': '',
                'index': 1,
                'selectIndex': 0,
                'optionStyle': 'line',
                'showButton': true
            }, {
                'name': '户型',
                'label': '户型',
                'tag': 'xinfanghuxing',
                'value': '',
                'index': 2,
                'selectIndex': 0,
                'optionStyle': 'line',
            }, {
                'name': '筛选',
                'label': '筛选',
                'tag': 'xfmore',
                'value': '',
                'index': 3,
                'type': 'filter',
                'selectIndex': 0,
                'optionStyle': 'allChioce'
            }]
        },

        'listOpts': {//列表组件的相关配置
            listType: 'xf',
            ToTop: 180
        },
    },
}