const qiniuUploader = require("../libs/qiniuUploader");
const app = getApp();
Component({
    behaviors: ['wx://form-field'],
    properties : {
      title : {
        type : String        
      },
      subtitle : {
        type : String
      },
      limit : {
        type : Number,
        value : 9
      },
      name : {
        type : String
      },
      value : {
        type : Array,
        value : []
      },
      openCover : {
        type : Boolean,
        value : true
      },
      image : {
        type : String
      }
    },
    data : {
      cover : 0
    },
    methods : {
      choose : function() {
        var that = this;
        var limit = this.data.limit - this.data.images.length;
        if(limit <= 0) return;
        wx.chooseImage({
          count: limit,
          success: (res)=> {
            this.uploadFile(res.tempFilePaths);
          }
        });
      },
      previewPhoto : function(e) {
        var url = e.currentTarget.dataset.url;
        var urls = this.Global._.map(this.data.images,function(v,k) {
          return v.imageURL
        });
        wx.previewImage({
          current:url,
          urls : urls
        });
      },
      uploadFile : function(files) {
          if(files.length == 0) {
            this.triggerEvent('complete');
            return;
          };
          var filePath = files.shift();
          qiniuUploader.upload(filePath, (res) => {
            if(this.data.images.length >= this.data.limit) return;
            var images = this.data.images;
            images.push(res);
            this.setData({
              images : images,
              value : images
            });
            this.uploadFile(files);
          }, (error) => {
            console.log('error: ' + error);
          }, {
            region: 'ECN',
            domain: 'http://oofuaem2b.bkt.clouddn.com',
            uptokenURL: 'http://house.jj58.com.cn/api/image/qnUpload',
          })
      },
      getData : function() {
        var _ = this.Global._;
        if(this.data.images.length){
          var image = this.data.cover == -1 ? '' : this.data.images[this.data.cover]['imageURL'];
          return {
            images : _.map(this.data.images,v=>v.imageURL),
            image : image
          }
        }else{
          return {
            images : '',
            image : ''
          }
        };
      },
      del : function(e) {
        var index = e.currentTarget.dataset.index;
        var cover = this.data.cover;
        if(index === cover){
          this.setData({
            cover : 0
          });
        }
        var images = this.data.images;
        images.splice(index,1);
        this.setData({
          images : images,
          value : images
        },()=>{
          this.triggerEvent('del');
        })
      },
      setCover : function(e) {
        var index = e.currentTarget.dataset.index;
        this.setData({
          cover : index
        });
      },
      getImages : function() {
        return this.data.images;
      },
      getAddImages : function() {
        return this.data.images.slice(this.data.locklen);
      },
      init : function() {
        var _ = this.Global._;
        var value = this.data.value;
        var image = this.data.image;
        var index = this.Global._.indexOf(value,image);

        var images = _.map(value,function(v) {
          return {
            imageURL : v
          }
        });
        this.setData({
          images : images,
          cover : index
        });
      }
    },
    ready : function() {
      this.Global = app.Global;
      this.init();
    }
})
