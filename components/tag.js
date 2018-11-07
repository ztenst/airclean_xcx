const app = getApp();
Component({
    properties : {
      type : {
        type : String,
        value : ''
      },
      detail : {
        type : Object
      }
    },
    data : {
    },
    methods : {
      onTap : function() {
        var url = '/pages/product/select';
        this.Global.goLink(url);
      },
      onSet : function(e) {
        this.set(e.py);
      },
      set : function(type) {
        this.setData({
          type : type
        });
        this.Api.productGetProTag({
          type : type
        }).then(obj=>{
          var detail = this.data.detail;
          if(detail){
            var new_list = this.Global._.map(obj.tags,function(v) {
              v.value = detail[v['field']];
              return v;
            });
            obj.list = new_list;
          }
          this.setData({
            select : obj
          })
        });
      },
      getTags : function() {
        var cs = this.selectAllComponents('.singSelect')
        var obj = {};
        this.Global._.each(cs,function(v) {
          var data = v.getTag();
          var name = data.name;
          var value = data.value;
          obj[name] = value;
        });
        obj['type'] = this.data.type;
        return obj;
      },
      init : function() {
        if(this.data.type){
          console.log(this.data.type);
          this.set(this.data.type);
        }
      }
    },
    ready : function() {
      this.Global = app.Global;
      this.Api = this.Global.Api;
      this.Global.pubsub.on('product-category',this.onSet.bind(this));
      this.init();
    }
  })
