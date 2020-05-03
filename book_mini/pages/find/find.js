// pages/find/find.js
import {
	FindModel
} from '../../model/findModel';
// import {
// 	LikeModel
// } from '../../model/like';
import {
	sortFromDate,
	dealDateData
} from '../../utils/util';

const findModel = new FindModel();
// const likeModel = new LikeModel();

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		finderData: [{
			image: '',
			title: '',
			content: '',
			pubdate: '',
			fav_nums: 0,
			nickName: '',
			avatarUrl: '',
		}]
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
		console.log('页面显示了')
		findModel.getFindData().then((res) => {
			// 1、按照日期的先后顺序排序
			const result = sortFromDate(res, 'pubdate');
			// 2、格式化时间
			result.forEach((item) => {
				const pubdate = item.pubdate;
				item.pubdate = dealDateData(pubdate);
			})
			this.setData({
				finderData: result
			});
		});
	},

	onLike(event) {
		const behavior = event.detail.behavior;
		console.log(behavior);

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

	onPageScroll: function(event) {
		// 页面滚动时执行
		console.log(event)
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