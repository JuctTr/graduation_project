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

    getMyFavor(success) {
        return this.request({
            url: 'classic/favor'
        })
    }
    publishClassic(formData) {
        return this.request({
            url: 'classic/publish',
            data: formData,
            method: 'POST'
        })
    }
}

export {
    IndexModel
};