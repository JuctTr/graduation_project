// components/bookItem/book-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    book: Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(event) {
      const bookId = this.properties.book.id;
      wx.navigateTo({
        url: `/pages/book-detail/index?bookId=${bookId}`,
        success: (result)=>{
          
        },
        fail: ()=>{},
        complete: ()=>{}
      });
      // 在组件中实现跳转，虽然方便，但是降低了组件的通用性
      // 如果只是服务于当前的项目，可以采用这种方法
    }
  }
})
