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
    likeImage: 'https://yicong.com/index/images/my.png'
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

  }
})
