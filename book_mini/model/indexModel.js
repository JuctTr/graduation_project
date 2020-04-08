import { HTTP } from '../common/request';

class IndexModel extends HTTP {
    getLatestIssue() {
        return this.request({
            url: 'classic/latest'
        })
    }
    
    getAllClassic() {
        return this.request({
            url: 'classic/all'
        });
    }
}

export {
    IndexModel
} ;