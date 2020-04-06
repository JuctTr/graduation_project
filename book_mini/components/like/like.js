// components/like/like.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    favNums: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    likeImage: 'http://localhost:3000/images/my.png',
    like: false,
  },

  /**
   * 组件的方法列表
   */
  created() {
    // console.log(this.properties.favNums)
  },
  attached() {
    console.log(this.properties.favNums)
  },
  methods: {
    onLike() {
      this.setData({
        like: !this.data.like
      })
    }
  }
})
