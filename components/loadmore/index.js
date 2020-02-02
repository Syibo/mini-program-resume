Component({
  externalClasses: ['l-class'],
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    show:Boolean,
    custom:Boolean,
    line:Boolean,
    color:String,
    type:{
      type:String,
      value:'loading'
    },
    endText:{
      type:String,
      value:'没有更多数据了'
    },
    loadingText:{
      type:String,
      value:'努力加载中...'
    }
  },

  data: {

  },

  ready: function () {

  },
  methods: {
    onLoadmore(){
      this.triggerEvent('lintap');
      this.triggerEvent('lintapcatch',{},{ bubbles: true });
    }
  }
});
