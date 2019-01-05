Component({
    behaviors: ['wx://form-field'],
    properties : {
      data : {
        type : Object,
        value : {}
      },
      value :{
        type : String,
        value : 0
      }
    },
    data : {
    },
    methods : {
      init : function() {
        var data = this.data.data;
        this.setData({
          name : data.field
        })
      },
      onChange : function(e) {
        this.setData({
          value : e.detail.value
        });
      },
      getTag : function() {
        return {
          name : this.data.name,
          value : this.data.value
        };
      }
    },
    ready : function() {
      this.init();
    }
})
