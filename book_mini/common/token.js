import config from '../config';

class Token {
    constructor() {
        this.verifyTokenUrl = config.api_base_url + 'token/verify'; // 验证token是否正确
        this.getTokenUrl = config.api_base_url + 'token'; // 前台获取token
    }
    verify() {
        const tokenCache = wx.getStorageSync('token');
        if (tokenCache) {
            
        }
    }
}

export default Token;