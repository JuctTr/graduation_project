import { HTTP } from '../common/request';

class IndexModel extends HTTP {
    getLatestIssue() {
        return this.request({
            url: 'classic/latest'
        })
    }
}

export {
    IndexModel
} ;