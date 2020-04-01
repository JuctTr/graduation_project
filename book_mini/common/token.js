import config from '../config';

class Token {
    constructor() {
        this.verifyTokenUrl = config.api_base_url + 'token/verify'; // 验证token是否正确
        this.getTokenUrl = config.api_base_url + 'token'; // 前台获取token
    }
    verify() {
        const tokenCache = wx.getStorageSync('token');
        if (tokenCache) {
            // 如果缓存里有了，则直接请求验证它的正确性
            this.verifyFromServer(tokenCache);
        } else {
            // 如果缓存里面没有，则从后台获取token
            this.getTokenFromServer();
        }
    }

    verifyFromServer(token) {
        var _that = this;
        wx.request({
            url: _that.verifyTokenUrl,
            method: 'POST',
            data: {
                token: token
            },
            success: function(res) {
                console.log(res, '去服务器验证token')
                var valid = res.data.isValid;
                if (!valid) {
                    _that.getTokenFromServer();
                }
            }
        })
    }

    getTokenFromServer(callback) {
        var _that = this;
        wx.login({
            success: function(res) {
                console.log(res, '登录的code');
                wx.request({
                    url: _that.getTokenUrl,
                    method: 'POST',
                    data: {
                        account: res.code,
                        type: 100 // 表示是小程序登录
                    },
                    success: function(res) {
                        wx.setStorageSync('token', res.data.userToken);
                        console.log('服务器返回的token', res.data)
                        callback && callback(res.data.userToken);
                    }
                })
            }
        })
    }
}

export default Token;