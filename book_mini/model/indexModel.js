import { HTTP } from '../utils/request';

class IndexModel extends HTTP {
    getLatestIssue() {
        return this.request({
            url: 'index/latest'
        })
    }
}

export {
    IndexModel
}