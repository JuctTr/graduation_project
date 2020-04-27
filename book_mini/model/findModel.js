import {
    HTTP
  }
  from '../common/request';

  class FindModel extends HTTP {
      getFindData () {
          return this.request({
            url: 'community'
          })
      }
      getAddData () {
        return this.request({
          url: 'books'
        })
      }
  }

export {
  FindModel
}