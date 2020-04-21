//index.js
const app = getApp();
import { dealIndexData } from '../../utils/tool';
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
				"img": "http://192.168.0.13:3000/images/animal.png",
				"pubdate": "2018-06-22",
				"fav_nums": 10
			},
			"backData": {
				"content": "“我们应该到那里去，我们属于那里。” “不，我们不属于任何地方，除了彼此身边。”",
				"title": "疯狂的动物城",
				"img": "http://192.168.0.13:3000/images/back_animal.jpg"
			}        
		}],
		everyCard: [{
			animationData: {},
			ifFrontOrBack: false
		}],
		cardIndex: 0,
		ifFilpCard: false
	},
	
	onLoad: function () {
		// 获取最新一期
		model.getAllClassic().then((source) => {
			let everyCard = [];
			const bannerData = dealIndexData(source);
			console.log(bannerData)
			bannerData.forEach(() => {
				everyCard.push({
					animationData: {},
					ifFrontOrBack: false
				})
			})
			this.setData({
				bannerData,
				everyCard
			});
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

		var currentIndex = event.currentTarget.dataset.id;
		console.log(currentIndex)
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

