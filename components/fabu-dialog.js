const app = getApp();
Component({
    properties : {
      show : {
        type : Boolean,
        value : false,
        observer : function(newValue,oldValue) {
          this.setData({
            show : newValue
          })
        }
      }
    },
    data : {
    },
    methods : {
      close : function() {
        this.setData({
          show : false
        })
      },
      goLink : function(e) {
        var url = e.currentTarget.dataset.url;
        this.Global.goLink(url);
      }
    },
    ready : function() {
      this.Global = app.Global;
    }
})
