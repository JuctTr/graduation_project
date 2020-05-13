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
		showShortComment: false,
		comment: ''
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		const id = options.bookId;
		// 后面如果有后台了，就把6980改成id
		const detailInfo = booksModel.getDetailInfo(id);
		const comments = booksModel.getComments(id);
		detailInfo.then((res) => {
			this.setData({
				book: res
			});
		});
		comments.then((res) => {
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

	onPost(event) {
		const comment = event.detail.text || event.detail.value

		if (!comment) {
			return
		}

		if (comment.length > 12) {
			wx.showToast({
				title: '短评最多12个字',
				icon: 'none'
			})
			return
		}

		booksModel.postComment(this.data.book.id, comment)
			.then(res => {
				wx.showToast({
					title: '+ 1',
					icon: "none"
				})
				let newComments = this.data.comments;
				let isHave = false;
				// 遍历一下数组，如果文本相同，只改变num
				for (let item of newComments) {
					if (item.content == comment) {
						item.nums++;
						isHave = true;
					}
				}
				if (!isHave) {
					newComments.unshift({
						content: comment,
						nums: 1
					})
				}

				this.setData({
					comments: newComments,
					posting: false,
					comment: ''
				})
			})
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})