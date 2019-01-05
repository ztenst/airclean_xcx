const app = getApp();
Component({
    properties : {
      areaid : {
        type : String,
        value : ''
      },
      streetid : {
        type : String,
        value : ''
      }
    },
    data : {
      value : []
    },
    methods : {
      getStreet : function(areaid) {
        var _ = this.Global._;
        var area = _.findWhere(this.data.list,{
          id : areaid
        });
        var street = area.childAreas;
        return street;
      },
      initArea : function() {
        var _ = this.Global._;
        var list = this.data.list;

        var area = _.map(list,function(v,k) {
          return {
            name : v.name,
            id : v.id
          }
        });
        this.setData({
          area : area,
          areaid : this.data.areaid || area[0]['id']
        });
      },
      getData : function() {
        var select = this.data.select;
        if(select){
          return {
            area : select.area.id,
            street : select.street.id
          }
        }else{
          return {
            area : 0,
            street : 0
          }
        }
      },
      columnChange: function(e) {
        var detail = e.detail;
        var column = detail.column;
        var value = detail.value;
        var area = this.data.area;
        var areaid = area[value]['id'];
        if(column == 0){
          var street = this.getStreet(areaid);
          var multiArray = [area,street];
          this.setData({
            multiArray : multiArray,
            value : [value,0]
          });
        }
      },
      init : function() {
        return this.Api.areaTag().then(obj=>{
          this.setData({
            list : obj
          })
          var list = this.data.list;
          this.initArea();
          var area = this.data.area;
          var areaid = this.data.areaid;
          var street = this.getStreet(areaid);
          var multiArray = [area,street];
          this.setData({
            street : street
          });
          var areaindex = this.getAreaIndex();
          var streetindex= this.getStreetIndex();
          var value = [areaindex,streetindex];
          this.setData({
            multiArray : multiArray,
            value : value
          });
          var select = this.getSelect(value);
          this.setData({
            select : select
          })
        })
      },
      getAreaIndex : function() {
        var area = this.data.area;
        var areaid = this.data.areaid;
        var index = this.Global._.findIndex(area,function(v) {
          return v.id;
        });
        return index;
      },
      getStreetIndex : function() {
        var street = this.data.street;
        var streetid = this.data.streetid;
        var index = this.Global._.findIndex(street,function(v) {
          return v.id == streetid;
        });
        return index;
      },
      getSelect : function(value) {
        var multiArray = this.data.multiArray;
        var area = multiArray[0][value[0]];
        var street = multiArray[1][value[1]];
        return {
          area : area,
          street : street,
          text : area.name + '-' + street.name
        }
      },
      onChange : function(e) {
        var value = e.detail.value;
        var multiArray = this.data.multiArray;
        var select = this.getSelect(value);
        this.setData({
          value : value,
          select : select
        });
      }
    },
    ready : function() {
      this.Global = app.Global;
      this.Api = this.Global.Api;
      //var list = [{
          //name : '江苏',
          //id : 1,
          //childAreas : [{
            //name : '常州',
            //id : 2
          //},{
            //name : '地区2',
            //id : 3
          //}]
        //},{
          //name : '江苏2',
          //id : 4,
          //childAreas : [{
            //name : '常州2',
            //id : 5
          //},{
            //name : '地区3',
            //id : 6
          //}]
        //}]
      //this.data.list = list;
      this.init();
    }
})
