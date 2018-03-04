import api from '../../common/api'
import Util from '../../common/util'
import regeneratorRuntime from '../../libs/regenerator-runtime/runtime';

const qiniuUploader = require("../../common/qiniuUploader");

function getKey() {
    var myDate = new Date();
    var month = myDate.getMonth() + 1;
    var day = myDate.getDate();
    var key = '';
    var time = new Date().getTime();
    var Range = 999999 - 100000;
    var Rand = Math.random();
    var num = 100000 + Math.round(Rand * Range);
    return key + myDate.getFullYear() + '/' + (month < 10 ? "0" + month : month) + (day < 10 ? "0" + day : day) + '/' + new Date().getTime() + num + '.jpg';
}

function didPressChooesImage(that) {
    // initQiniu();
    // 微信 API 选文件
    wx.chooseImage({
        count: 1,
        success(res) {
            var filePath = res.tempFilePaths[0];
            // 交给七牛上传
            qiniuUploader.upload(filePath, (res) => {
                    that.data.uploadImgs.push(`http://` + res.imageURL);
                    that.setData({
                        currentFm: that.data.uploadImgs[0],
                        uploadImgs: that.data.uploadImgs
                    });
                }, (error) => {
                    console.error('error: ' + JSON.stringify(error));
                }
                , {
                    region: 'NCN', // 华北区
                    domain: 'oofuaem2b.bkt.clouddn.com',
                    uptokenURL: 'http://house.jj58.com.cn/api/image/qnUpload',
                    shouldUseQiniuFileName: false,
                    key: getKey(),
                }
            );
        }
    })
}

let app = getApp();

Page({
    data: {
        uploadImgs: [],
        currentFm: 0,
        toast: null,
    },
    async onLoad() {

        await app.getUserOpenId();

        this.setData({
            toast: this.selectComponent('#toast')
        });

        //初始化表单校验组件
        this.WxValidate = app.WxValidate({
            'title': {required: true}, // 标题
            'content': {required: true, minlength: 10,}, //内容
            'fm': {required: true}, // 封面
        }, {
            'title': {required: '请输入标题'}, // 标题
            'content': {required: '请输入内容'}, //内容
            'fm': {required: '请输入封面'}, // 封面
        });
    },

    //改变封面
    changeFm(e) {
        const dataset = e.currentTarget.dataset;
        const current = dataset.url;
        this.setData({
            currentFm: current
        })
    },
    //删除图片
    deleteUploadImg(e) {
        const dataset = e.currentTarget.dataset;
        const current = dataset.current;
        this.data.uploadImgs.splice(current, 1);
        this.setData({
            uploadImgs: this.data.uploadImgs
        })
    },
    //上传项目图片
    didPressChooesImage() {
        var that = this;
        didPressChooesImage(that);
    },
    /**
     * 提交表单
     * @param e
     * @returns {boolean}
     */
    submitForm(e) {
        const formParms = e.detail.value;
        if (!this.WxValidate.checkForm(e)) {
            const error = this.WxValidate.errorList[0];
            this.data.toast.show(error.msg)
            return false
        }
        if (this.data.uploadImgs.length == 0) {
            this.data.toast.show('请上传图片')
            return false
        }
        let params = Object.assign({}, formParms, {imgs: this.data.uploadImgs}, {uid: app.globalData.wxData.uid});

        api.addNews(params).then(res => {
            let data = res;
            this.data.toast.show(data.msg)
        });
    },
});

