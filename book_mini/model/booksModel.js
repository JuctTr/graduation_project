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
  // 新增短评
  getAddShortComment(bookId) {
    return this.request({
      url: 'book/add/short_comment'
    })
  }
}

export { BooksModel }