//index.js
const app = getApp();
import { IndexModel } from '../../model/indexModel';
const model = new IndexModel();

Page({
	data: {
		autoplay: false,
		bannerData: [{
			"id": 1,
			"index": 7,
			"like_status": 0,
			"cardType": 100,
			"frontData": {
				"img": "http://localhost:3000/images/animal.png",
				"pubdate": "2018-06-22",
				"fav_nums": 10
			},
			"backData": {
				"content": "“我们应该到那里去，我们属于那里。” “不，我们不属于任何地方，除了彼此身边。”",
				"title": "疯狂的动物城",
				"img": "http://localhost:3000/images/back_animal.jpg"
			}        
		},{
			"id": 2,
			"index": 6,
			"frontData": {
				"img": "http://localhost:3000/images/avengers.jpg",
				"pubdate": "2018-06-22",
				"fav_nums": 10
			},
			"backData": {
				"content": "人生不能像做菜，把所有的料准备好才下锅",
				"title": "疯狂的动物城",
				"img": "http://localhost:3000/images/back_avengers.jpg"
			},  
			"cardType": 200       
		},{
			"id": 3,
			"index": 5,
			"frontData": {
				"img": "http://localhost:3000/images/animal.png",
				"pubdate": "2018-06-22",
				"fav_nums": 10
			},
			"backData": {
				"content": "人生不能像做菜，把所有的料准备好才下锅",
				"title": "疯狂的动物城"
			},  
			"cardType": 300       
		},{
			"id": 4,
			"index": 4,
			"frontData": {
				"img": "http://localhost:3000/images/avengers.jpg",
				"pubdate": "2018-06-22",
				"fav_nums": 10
			},
			"backData": {
				"content": "人生不能像做菜，把所有的料准备好才下锅",
				"title": "疯狂的动物城"
			},  
			"cardType": 100       
		},{
			"id": 5,
			"index": 6,
			"frontData": {
				"img": "http://localhost:3000/images/animal.png",
				"pubdate": "2018-06-22",
				"fav_nums": 10
			},
			"backData": {
				"content": "人生不能像做菜，把所有的料准备好才下锅",
				"title": "疯狂的动物城"
			},  
			"cardType": 200       
		},{
			"id": 6,
			"index": 2,
			"frontData": {
				"img": "http://localhost:3000/images/avengers.jpg",
				"pubdate": "2018-06-22",
				"fav_nums": 10
			},
			"backData": {
				"content": "人生不能像做菜，把所有的料准备好才下锅",
				"title": "疯狂的动物城"
			},  
			"cardType": 300       
		}],
		everyCard: [{
			animationData: {},
			ifFrontOrBack: false
		}, {
			animationData: {},
			ifFrontOrBack: false
		}, {
			animationData: {},
			ifFrontOrBack: false
		}, {
			animationData: {},
			ifFrontOrBack: false
		}, {
			animationData: {},
			ifFrontOrBack: false
		}, {
			animationData: {},
			ifFrontOrBack: false
		}],
		cardIndex: 0,
		ifFilpCard: false
	},
	
	onLoad: function () {
		// 获取最新一期
		model.getLatestIssue().then((res) => {
			// this.setData({
			// 	bannerData: res
			// })
			// console.log(this.data.bannerData)
			console.log(res)
		})
	},

	// bannerChange(event) {

	//   const cardIndex = event.detail.current;
	//   this.setData({
	//     cardIndex,
	//     animationData: {}
	//   });

	// },

	onFlipCard(event) {

		var currentIndex = event.currentTarget.dataset.id - 1;
		this.commonFilp(currentIndex);

	},
	commonFilp(currentIndex) {
		const self = this;
		const animation = wx.createAnimation({
			duration: 500,
			timingFunction: 'ease-in-out'
		})
		this.animation = animation;

		var flipBool = this.data.everyCard[currentIndex].ifFrontOrBack;

		if (!flipBool) {
			animation.rotateY(220).step().rotateY(170).step()
				.rotateY(185).step({ duration: 100 })
				.rotateY(175).step({ duration: 100 })
				.rotateY(180).step({ duration: 100 });
		} else {
			animation.rotateY(-40).step().rotateY(10).step()
				.rotateY(-5).step({ duration: 100 })
				.rotateY(5).step({ duration: 100 })
				.rotateY(0).step({ duration: 100 });
		}

		var animationData = `everyCard[${currentIndex}].animationData`;
		var ifFrontOrBack = `everyCard[${currentIndex}].ifFrontOrBack`;

		this.setData({
			[animationData]: animation.export(),
			[ifFrontOrBack]: !self.data.everyCard[currentIndex].ifFrontOrBack
		})
	},
	finishAnim(event) {
		// console.log('动画结束了', event);
		/**
		 * 每一张swiper-item滑动结束后触发
		 */
	}

})

