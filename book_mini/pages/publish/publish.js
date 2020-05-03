// pages/publish/publish.js
import { IndexModel } from '../../model/indexModel';
import { HTTP } from '../../common/request';

const indexModel = new IndexModel();
const http = new HTTP();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		filename: '', // 网络路径
		localFilename: '',
		type: 300,
		title: '',
		content: '',
		author: '',
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
		this.setData({
			filename: '', // 网络路径
			localFilename: '',
			type: 300,
			title: '',
			content: '',
			author: '',
		})
	},
	setValue(event) {
		const type = event.currentTarget.dataset.type;
		const value = event.detail.value;
		this.setData({
			[type]: value
		})
	},

	handleReset() {
		console.log('我执行了reset事件');
		this.setData({
			localFilename: ''
		})
	},
	handleSubmit(event) {
		console.log(event);
		const that = this;
		// 图片上传到服务器
		this._uploadImg(that.data.localFilename);
	},
	uploadFormData(filename) {
		const {
			title,
			content,
			author,
			type,
		} = this.data;
		// 把表单数据上传到服务器
		const formData = {
			title,
			content,
			author,
			type,
			filename
		};
		indexModel.publishClassic(formData).then((res) => {
			if (res) {
				wx.switchTab({
					url: `/pages/find/find`,
					success() {

					}
				})
			}
		})
	},
	radioChange(event) {
		console.log(event)
		const type = event.detail.value;
		this.setData({
			type
		})
	},

	chooseImageTap() {
		var that = this;
		wx.showActionSheet({
			itemList: ['从相册中选择', '拍照'],
			itemColor: "#00000",
			success: function (res) {
				if (!res.cancel) {
					if (res.tapIndex == 0) {
						that._chooseWxImage('album');
					} else if (res.tapIndex == 1) {
						that._chooseWxImage('camera');
					}
				}
			}
		})
	},
	// 图片本地路径
	_chooseWxImage(type) {
		const that = this;
		wx.chooseImage({
			sizeType: ['original', 'compressed'],
			sourceType: [type],
			success: function (res) {
				console.log(res.tempFilePaths[0], '上传的图片');
				that.setData({
					localFilename: res.tempFilePaths[0]
				})
			}
		})
	},
	//上传服务器
	_uploadImg(imgurl) {
		const that = this;
		wx.uploadFile({
			url: 'http://localhost:3000/v1/publish/uploadFile',
			filePath: imgurl,
			name: 'file',
			header: {
				'content-type': 'multipart/form-data',
				Authorization: http._encode()
			},
			formData: null,
			success: function (res) {
				const result = JSON.parse(res.data);
				console.log(result);
				that.setData({
					filename: result.filename
				});
				that.uploadFormData(result.filename);
			}
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