import config from '../config'
import util from './util'
import _ from '../libs/lodash/we-lodash'
import CacheFactory from '../libs/cacheFactory'

const cache = new CacheFactory('api', {capacity: 100})
const HOST = config.host

if (!Promise.prototype.finally) {
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
}

/**
 * 微信请求promise化
 * @param  {Function} fn [description]
 * @return {[type]}      [description]
 */
function ajaxPromisify(fn) {
    return function (obj = {}) {
        return new Promise((resolve, reject) => {
            obj.success = function (res) {
                //成功
                resolve(res.data)
            }
            obj.fail = function (res) {
                //失败
                reject(res.statusCode)
            }
            fn(obj)
        })
    }
}

//可以差缓存的promise
const requestCachePromise = function (obj, opts = {cache: false}) {
    let requestPromise = ajaxPromisify(wx.request)
    if (opts.cache) {
        let u = obj.url + JSON.stringify(obj.data)
        let c = cache.get(u)
        if (c) {
            return new Promise(resolve => {
                resolve(_.cloneDeep(c))
            })
        } else {
            return requestPromise(obj).then(json => {
                cache.put(u, _.cloneDeep(json)) //储存拷贝, 使用原值
                return json
            })
        }
    }
    return requestPromise(obj)
}

/**
 * 微信请求get方法
 * url
 * data 以对象的格式传入
 */
function getRequest(url, data = {}, opts) {
    return requestCachePromise({
        url: url,
        method: 'GET',
        data: util.filterEmpty(data),
        header: {
            'content-Type': 'application/json'
        }
    }, opts)
}

/**
 * 微信请求post方法封装
 * url
 * data 以对象的格式传入
 */
function postRequest(url, data = {}) {
    return requestCachePromise({
        url: url,
        method: 'POST',
        data: util.filterEmpty(data),
        header: {
            'content-type': 'application/x-www-form-urlencoded'
        },
    })
}

export default {
    getIndex() {
        return getRequest(`${HOST}/api/index/index`)
    },
    getActiveTags() {
        return getRequest(`${HOST}/api/tag/activeTags`, {}, {cache: true})
    },
    getProductList(params) {
        return getRequest(`${HOST}/api/product/list`, params)
    },
    getProductInfo(params) {
        return getRequest(`${HOST}/api/product/info`, params)
    },
    getCusList(params) {
        return getRequest(`${HOST}/api/cus/list`, params)
    }
}