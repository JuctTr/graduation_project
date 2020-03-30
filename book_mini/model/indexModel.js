import { HTTP } from '../common/request';

class IndexModel extends HTTP {
    getLatestIssue() {
        return this.request({
            url: 'v1/classic/latest'
        })
    }
}

export {
    IndexModel
}