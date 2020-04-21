import { Base64 } from 'js-base64';

const apiDomain = 'http://192.168.0.13:3000/v1/';

class HTTP {
    request({ url, data = {}, method = 'GET'}) {
        return new Promise((resolve, reject) => {
            this._request( url, resolve, reject, data, method );
        })
    };

    _request(url, resolve, reject, data={}, method='GET') {
        wx.request({
            url: apiDomain + url,
            method: method,
            data: data,
            header: {
                "Content-Type": "application/json",
                Authorization: this._encode() // 使用basic Auth进行传输，这个知识点还需学习
            },
            success: (res) => {
                let code = res.statusCode.toString();
                if (code.startsWith('2')) {
                  resolve(res.data);
                } else {
                  reject();
                  // 这里需要后台的配合
                  // const error_code = res.data.error_code
                  // this._show_error(error_code)          
                }
            },
            fail: (err) => {
                reject();
                // this.show_error(1);
            }            
        })
    }
    /**
     * @description 使用basic Auth进行传输，对传参进行拼接
     */
    _encode() {
        const token = wx.getStorageSync('token');
        
        // const base64 = new Base64()
        const result = Base64.encode(token + ':');
        console.log(result);
        return 'Basic ' + result;
    }
}

export {
    HTTP
}