//index.js
//获取应用实例
const app = getApp();
import { IndexModel } from '../../model/indexModel';
let getData = new IndexModel();



Page({
  data: {
    autoplay: false,
    bannerData: [],
    everyCard: [{
      animationData: {},
      ifFrontOrBack: false
    },{
      animationData: {},
      ifFrontOrBack: false
    },{
      animationData: {},
      ifFrontOrBack: false
    },{
      animationData: {},
      ifFrontOrBack: false
    },{
      animationData: {},
      ifFrontOrBack: false
    },{
      animationData: {},
      ifFrontOrBack: false
    }],
    cardIndex: 0,
    ifFilpCard: false
  },
  
  // bannerChange(event) {

  //   const cardIndex = event.detail.current;
  //   this.setData({
  //     cardIndex,
  //     animationData: {}
  //   });

  // },

  onFlipCard (event) {

    var currentIndex = event.currentTarget.dataset.id - 1;
    this.commonFilp(currentIndex);
    
  },
  commonFilp (currentIndex) {
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
      .rotateY(180).step({duration: 100});
    } else {
      animation.rotateY(-40).step().rotateY(10).step()
      .rotateY(-5).step({ duration: 100 })
      .rotateY(5).step({ duration: 100 })
      .rotateY(0).step({duration: 100});      
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
  },
  onLoad: function () {
    // 获取最新一期
    getData.getLatestIssue().then((res) => {
      this.setData({
        bannerData: res
      })
      console.log(this.data.bannerData)
    })


  },

})

