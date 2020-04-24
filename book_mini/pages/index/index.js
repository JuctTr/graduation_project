//index.js
const app = getApp();
import { dealIndexData } from '../../utils/tool';
import { IndexModel } from '../../model/indexModel';
import { LikeModel } from '../../model/likeModel';

const model = new IndexModel();
const likeModel = new LikeModel();
const mMgr = wx.getBackgroundAudioManager();

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
			},
			"url": ""       
		}],
		everyCard: [{
			animationData: {},
			ifFrontOrBack: false
		}],
		cardIndex: 0, // 当前卡片的索引
		ifFilpCard: false,
		/*--------音乐---------*/ 
		musicData: {
			playing: false,
			pauseSrc: '../../images/music/player@pause.png',
			playSrc: '../../images/music/player@play.png',		
		},
		musicTitle: '',
		musicUrl: '',
		/*--------音乐end---------*/ 
	},
	
	onLoad: function () {
		// 获取最新一期
		model.getAllClassic().then((source) => {
			let everyCard = [];
			const bannerData = dealIndexData(source);
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
			const music = this.data.bannerData[0];
			if (music.cardType == 200) {
				this.setData({
					musicTitle: music.backData.title,
					musicUrl: music.url
				})
			}
		})
	},
/**
 * @description 首页幻灯片改变时触发
 */
	bannerChange(event) {
		const current = event.detail.current;
		this.setData({
			cardIndex: current
		})
		const musicType = this.data.bannerData[current].cardType;
		if (musicType == 200) {
			const musicUrl = encodeURI(this.data.bannerData[current].url);
			const musicTitle = this.data.bannerData[current].backData.title;
			this.setData({
				musicTitle,
				musicUrl,
			});
			const playing = mMgr.src == this.data.musicUrl ? true : false;
			this.setData({
				['musicData.playing']: playing
			})
		}
	},

	onFlipCard(event) {
		var currentIndex = event.currentTarget.dataset.mark;
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
/**
 * @description 每一张swiper-item滑动结束后触发
 */	
	finishAnim(event) {
		// console.log('动画结束了', event);

	},
	/**
	 * @description 音乐
	 */
	onPlay() {
		if (!this.data.musicData.playing) {
			this.setData({
				['musicData.playing']: true
			})
			mMgr.src = this.data.musicUrl;
			mMgr.title = this.data.musicTitle;
		} else {
			this.setData({
				['musicData.playing']: false
			})
			mMgr.pause();
		}
	},

	/**
	 * @description 接收点赞组件传过来的事件
	 */
	onLike(event) {
		const behavior = event.detail.behavior; // 告诉到底是取消还是点赞
		const {
			cardIndex
		} = this.data;
		likeModel.like(behavior,
			this.data.bannerData[cardIndex].id,
			this.data.bannerData[cardIndex].cardType);
	},
	preventBubble() { return false; } // 用来阻止分享按钮冒泡
})

