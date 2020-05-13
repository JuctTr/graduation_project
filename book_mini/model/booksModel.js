import { HTTP } from '../common/request';

class BooksModel extends HTTP {
  // 获取热门书籍
  getHotList() {
    return this.request({
      url: 'book/hot_list'
    })
  };
  // 获取书籍详细信息
  getDetailInfo(bookId) {
    return this.request({
      url: `book/${bookId}/detail`
    })
  };
  // 获取书籍的短评
  getComments(bookId) {
    return this.request({
      url: `book/${bookId}/short_comment`
    })
  };
  // 获取当前书籍的点赞状态
  getBookFavor(bookId) {
    return this.request({
      url: `book/${bookId}/favor`
    })
  };
  /**
   * @param {Number} start 开始记录数，默认为0
   * @param {String} query 搜索内容,比如你想搜索python相关书籍,则输入python
   * @param {Number} count: 记录条数，默认为20,超过依然按照20条计算
   * @param {Number} summary: 返回完整或简介,默认为0,0为完整内容,1为简介
   */
  search(start, query) {
    return this.request({
      url: 'book/search?summary=1',
      data: {
        q: query,
        start: start
      }
    })
  }
  // 新增短评
  getAddShortComment(bookId) {
    return this.request({
      url: 'book/add/short_comment'
    })
  }

  getMyBookCount() {
    return this.request({
      url: 'book/favor/count'
    })
  }

  postComment(bid, comment) {
    return this.request({
        url: 'book/add/short_comment',
        method: 'POST',
        data: {
            book_id: bid,
            content: comment
        }
    })
}
}

export { BooksModel }