import { HTTP } from '../common/request';

class UserModel extends HTTP {
    uploadUserInfo(userInfo) {
        return this.request({
            url: 'user/userinfo',
            data: userInfo,
            method: 'POST'
        })
    }
}

export {
    UserModel
};