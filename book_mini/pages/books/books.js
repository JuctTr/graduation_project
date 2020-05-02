// pages/books/books.js
import { BooksModel } from '../../model/booksModel';
import { random } from '../../utils/util';

const booksModel = new BooksModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: [],
    searching: false,
    loadMore: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    booksModel.getHotList().then((res) => {
      this.setData({
        books: res
      });
      console.log(res)
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

  onSearching() {
    this.setData({
      searching: true
    })
  },
  onCancel(event){
    this.setData({
      searching:false
    }) 
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
    this.setData({
      loadMore: random(16)
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})