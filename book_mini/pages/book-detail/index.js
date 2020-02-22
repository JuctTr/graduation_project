// pages/book-detail/index.js
import { BooksModel } from '../../model/booksModel';
const booksModel = new BooksModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    book: null,
    comments: [],
    showShortComment: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options.bookId;
    // 后面如果有后台了，就把6980改成id
    const detailInfo = booksModel.getDetailInfo(6980);
    const comments = booksModel.getComments(6980);
    detailInfo.then((res) => {
      this.setData({
        book: res
      });
      console.log(res)
    });
    comments.then((res) => {
      console.log(res)
      this.setData({
        comments: res.comments
      })
    })    
  },
  onFakePost() {
    this.setData({
      showShortComment: true
    })
  },
  cancel() {
    this.setData({
      showShortComment: false
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})