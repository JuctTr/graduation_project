// pages/publish/publish.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		filename:'',//网络路径
		localFilename: '',
		type: 300,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

	},

	handleReset() {
		console.log('我执行了reset事件');
		this.setData({
			localFilename: ''
		})
	},
	handleSubmit(event) {
		console.log(event);
		this._uploadImg(this.data.localFilename); // 上传到服务器
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
		var that = this;
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
	_uploadImg: function (imgurl) {
		var that = this;
		wx.uploadFile({
			url: 'http://localhost:3000/v1/publish/uploadFile',
			filePath: imgurl,
			name: 'file',
			header: {
				'content-type': 'multipart/form-data'
			},
			formData: null,
			success: function (res) {
				const result = JSON.parse(res.data);
				that.setData({
					filename: result.filename
				})
			}
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