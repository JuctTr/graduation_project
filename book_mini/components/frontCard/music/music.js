// components/frontCard/music/music.js
const mMgr = wx.getBackgroundAudioManager();

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        musicUrl: String,
        image: String,
        musicTitle: String,
    },

    /**
     * 组件的初始数据
     */
    data: {
        playing: false,
        pauseSrc: '../../../images/music/player@pause.png',
        playSrc: '../../../images/music/player@play.png',
    },
    lifetimes: {
        attached: function () {
            // 在组件实例进入页面节点树时执行
            // 跳转页面 当前 切换
            // this._recoverStatus()
            // this._monitorSwitch()
        },
        detached: function () {
            // 在组件实例被从页面节点树移除时执行
        },
    },
    attached(event) {

    },
    /**
     * 组件的方法列表
     */
    methods: {
        onPlay() {
            if (!this.data.playing) {
                this.setData({
                    playing: true
                })
                mMgr.src = this.properties.musicUrl;
                mMgr.title = this.properties.musicTitle;
            } else {
                this.setData({
                    playing: false
                })
                mMgr.pause();
            }
        },
        ifCurrentMusic(url, musicTitle) {
            let musicUrl = encodeURI(url);
            console.log(mMgr.src, "当前播放的");
            console.log(musicUrl, "外部传入的");
            console.log(this.properties.musicUrl, '属性')
            if (mMgr.src != musicUrl) {
                this.setData({
                    playing: false
                })
            } else {
                this.setData({
                    playing: true
                })
            }
        },
        // _recoverStatus: function () {
        //     console.log(mMgr.paused);
        //     if (mMgr.paused) {
        //         this.setData({
        //             playing: false
        //         })
        //         return
        //     }
        //     console.log(mMgr.src)
        //     if (mMgr.src == this.properties.musicUrl) {
        //         this.setData({
        //             playing: true
        //         })
        //         mMgr.play();
        //     }
        // },

        _monitorSwitch: function () {
// 监听开关，如果切换到其他音乐页面，按钮要为暂停状态
/* 这些是回调函数，比如执行pause()之后（也就是你点击播放暂停按钮的时候），
才会执行onPause()函数 */            
            // mMgr.onPlay(() => {
            //     this._recoverStatus()
            // })
            // mMgr.onPause(() => {
            //     this._recoverStatus()
            // })
            // mMgr.onStop(() => {
            //     this._recoverStatus()
            // })
            // mMgr.onEnded(() => {
            //     this._recoverStatus()
            // })
        }
    }
})
