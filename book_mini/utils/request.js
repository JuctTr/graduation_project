const apiDomain = 'https://yicong.com/';

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
                "Content-Type": "application/json"
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
}

export {
    HTTP
}