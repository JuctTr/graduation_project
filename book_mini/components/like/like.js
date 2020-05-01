// components/like/like.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    favNums: {
      type: Number
    },
    like: {
      type: Boolean
    },
    readOnly:{
      type: Boolean
    },
    isMyPage: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  created() {
    // console.log(this.properties.favNums)
  },
  attached() {

  },
  methods: {
    onLike() {
      if(this.properties.readOnly){
        return
      }      
      let like = this.properties.like;
      let favNums = this.properties.favNums;

      favNums = like ? favNums - 1 : favNums + 1;
      this.setData({
        favNums: favNums,
        like: !like
      })
      // 激活
      let behavior = this.properties.like ? 'like' : 'cancel';
      this.triggerEvent('like',{
        behavior: behavior
      },{})
    }
  }
})
