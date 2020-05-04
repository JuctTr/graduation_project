import { Base64 } from 'js-base64';

const apiDomain = 'http://192.168.0.13:3000/v1/';


class HTTP {
    request({ url, data = {}, method = 'GET' }) {
        return new Promise((resolve, reject) => {
            this._request(url, resolve, reject, data, method);
        })
    };

    _request(url, resolve, reject, data = {}, method = 'GET') {
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
                    const error_code = res.data.error_code
                    const msgArr = res.data.msg;
                    this._show_error(error_code, msgArr);  
                }
            },
            fail: (err) => {
                reject();
                this._show_error(1, '请检查网络是否正常');
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
        return 'Basic ' + result;
    }

    _show_error(error_code, msg) {
        let tip = '';
        const isStrOrArr = (typeof msg) == 'string' ? true : false;
        if (!error_code) {
            tip = '抱歉，出现了一个错误，请稍后再来！';
        } else {
            if (isStrOrArr) {
                tip = msg;
            } else {
                for(let key in msg) {
                    tip += `${msg[key]}，`
                }                
            }
        }
        wx.showToast({
            title: tip,
            icon: 'none',
            duration: 3000
        })
    }

    _refetch(...param) {
        var token = new Token();
        token.getTokenFromServer((token) => {
            this._request(...param, true);
        });
    }
}

export {
    HTTP
}