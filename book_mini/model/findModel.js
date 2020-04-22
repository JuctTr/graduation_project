import {
    HTTP
  }
  from '../common/request';

  class FindModel extends HTTP {
      getFindData () {
          const result = this.request({
            url: 'find'
          })
          return result;
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