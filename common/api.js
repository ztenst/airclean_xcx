/* eslint-disable camelcase,spaced-comment,no-undef,comma-spacing */
import config from '../config'
import Util from '../utils/util'

//无论promise对象最后状态如何都会执行
Promise.prototype.finally = function (callback) {
    let P = this.constructor;
    return this.then(
        value => P.resolve(callback()).then(() => value),
        reason => P.resolve(callback()).then(() => {
            throw reason
        })
    );
};

/**
 * 微信请求promise化
 * @param  {Function} fn [description]
 * @return {[type]}      [description]
 */
function wxPromisify(fn) {
    return function (obj = {}) {
        return new Promise((resolve, reject) => {
            obj.success = function (res) {
                //成功
                resolve(res)
            }
            obj.fail = function (res) {
                //失败
                reject(res)
            }
            fn(obj)
        })
    }
}

/**
 * 微信请求get方法
 * url
 * data 以对象的格式传入
 */
function getRequest(url, data = {}) {
    var getRequest = wxPromisify(wx.request)
    return getRequest({
        url: url,
        method: 'GET',
        // data: Util.filterEmpty(data),
        data: data,
        header: {
            'Content-Type': 'application/json'
        }
    })
}

/**
 * 微信请求post方法封装
 * url
 * data 以对象的格式传入
 */
function postRequest(url, data = {}) {
    var postRequest = wxPromisify(wx.request)
    return postRequest({
        url: url,
        method: 'POST',
        data: Util.filterEmpty(data),
        header: {
            "content-type": "application/x-www-form-urlencoded"
        },
    })
}

const api = {
    /*首页*/
    getIndex() {
        let url = `${config.host}/api/index/index`;
        return getRequest(url)
    },


    /*产品列表*/
    getProductList(params) {
        let url = `${config.host}/api/product/list`;
        return getRequest(url, params)
    },
    /*产品详细页*/
    getProductInfo(params) {
        let url = `${config.host}/api/product/info`;
        return getRequest(url, params)
    },
    /*产品类别*/
    getCates(params) {
        let url = `${config.host}/api/product/getCates`;
        return getRequest(url, params)
    },
    /*发现列表*/
    getFindList(params) {
        let url = `${config.host}/api/find/list`;
        return getRequest(url, params)
    },
    /*案例列表*/
    getCusist(params) {
        let url = `${config.host}/api/cus/list`;
        return getRequest(url, params)
    },
    /*发现详细页*/
    getFindInfo(params) {
        let url = `${config.host}/api/find/info`;
        return getRequest(url, params)
    },
    /*案例详细页*/
    getCaseInfo(params) {
        let url = `${config.host}/api/cus/info`;
        return getRequest(url, params)
    },
    /*获取openid*/
    getOpenId(params) {
        let url = `${config.host}/api/index/getOpenId`
        return getRequest(url, params)
    },
    /*存用户信息*/
    indexSub(params) {
        let url = `${config.host}/api/index/setUser`
        return postRequest(url, params)
    },
    /*提交订单*/
    addOrder(params) {
        let url = `${config.host}/api/product/addOrder`
        return postRequest(url, params)
    },
    /*添加或取消收藏*/
    addSave(params) {
        let url = `${config.host}/api/product/addSave`
        return getRequest(url, params)
    },
    /*获取商家简介信息*/
    getIntro(params) {
        let url = `${config.host}/api/index/getIntro`
        return getRequest(url, params)
    },
     /*获取商家联系电话*/
    getIndexConfig(params) {
        let url = `${config.host}/api/index/config`
        return getRequest(url, params)
    },
};

module.exports = api