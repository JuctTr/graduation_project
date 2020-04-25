// pages/my/my.js
import {
  IndexModel
} from '../../model/indexModel';
import {
  BooksModel
} from '../../model/booksModel';

const indexModel = new IndexModel();
const booksModel = new BooksModel();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      nickName: '点击授权图像和昵称',
      avatarUrl: '../../images/avatar_default.png',
    },
    authorized: false,
    bookCount: 0,
    classics: null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.getMyFavor();
    this.getMyBookCount();
  },

  getUserInfo(event) {
    console.log(event.detail.userInfo);
    const {
      nickName,
      avatarUrl,
    } = event.detail.userInfo;
    this.setData({
      userInfo: {
        nickName,
        avatarUrl,
      }
    })
  },

  getMyFavor() {
    indexModel.getMyFavor().then(res => {
      this.setData({
        classics: res
      })
    })
  },

  getMyBookCount() {
    booksModel.getMyBookCount()
      .then(res => {
        this.setData({
          bookCount: res.count
        })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})