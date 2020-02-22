// components/dateAndIssue/date-issue.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pubdate: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  /**
   * 自小程序基础库版本 2.2.3 起，
   * 组件的的生命周期也可以在 lifetimes 字段内进行声明
   * （这是推荐的方式，其优先级最高）。
   */
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      console.log(this.properties.pubdate);
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
