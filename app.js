//app.js
import api from './common/api'
import util from './common/util'

App({
    onLaunch: function () {
    },
    /**
     * 获取openid 
     * @returns {Promise}
     */
    getUserOpenId: function () {
        var self = this;
        return new Promise((resolve, reject) => {
            wx.login({
                success: function (loginres) {
                    wx.getUserInfo({
                        success: function (RES) {
                            let userInfo = RES.userInfo;
                            self.globalData.userInfo = userInfo;
                            api.getOpenId({code: loginres.code}).then(res => {
                                let json = res.data;
                                self.globalData.wxData = json;
                                if (!json.uid) {
                                    let params = {
                                        openid: json.open_id,
                                        name: userInfo.nickName,
                                        sex: userInfo.gender,
                                        pro: userInfo.province,
                                        city: userInfo.city
                                    };
                                    resolve(api.indexSub(params))
                                }
                            })
                        }
                    });
                }
            })
        });
    },
    /**
     * 获取个人信息
     * @returns {Promise}
     */
    getUserInfo: function () {
        var self = this
        return new Promise((resolve, reject) => {
            if (self.globalData.userInfo) {
                resolve(self.globalData.userInfo)
            } else {
                //调用登录接口
                wx.login({
                    success: function () {
                        wx.getUserInfo({
                            success: function (res) {
                                self.globalData.userInfo = res.userInfo;
                                resolve(res.userInfo)
                            }
                        })
                    }
                })
            }
        })
    },
    /**
     * 页面跳转 url 页面路径，isForceNavigateTo 是否强制使用NavigateTo来跳转
     * 需要注意的是 传递页面的参数时只能是字字符串
     * @param url
     * @param params
     * options: {type: 'navigate' | 'redirect', force: false} //type 跳转方式, force: url一致时是否强制跳转
     */
    goPage(url, params = {}, options = {type: 'navigate'}) {
        console.log(url)
        if (!options.force && this.isCurrentPage()) return;
        //如果传了params 就做参数的拼接
        let query = util.params2Query(params)
        if (query)
            url = url + (url.indexOf('?') > -1 ? '' : '?') + query;

        let obj = Object.assign({url: url}, options)
        if (options.type == 'redirect' || getCurrentPages().length >= 5) {
            wx.redirectTo({url})
        } else {
            wx.navigateTo({url})
        }
    },
    getPage() {
        return getCurrentPages()[getCurrentPages().length - 1]
    },
    isCurrentPage(url, params = {}) {
        let page = this.getPage();
        if (!new RegExp(page.__route__).test(url)) return false
        if (JSON.stringify(params) !== JSON.stringify(page.options)) return false
        return true
    },
    globalData: {
        userInfo: null,
        wxData: null
    }
})