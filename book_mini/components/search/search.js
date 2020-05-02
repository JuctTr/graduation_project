// components/search/search.js
import {
	KeywordModel
} from '../../model/keywordModel';
import {
	BooksModel
} from '../../model/booksModel';
import { searchBehaviors } from '../behaviors/searchBehaviors';

const keywordModel = new KeywordModel('q', 10);
const booksModel = new BooksModel();

Component({
	behaviors: [searchBehaviors],
	properties: {
		loadMore: { // 控制是否加载更多的书籍
			type: String,
			observer: 'loadMore'
		}
	},

	data: {
		historyWords: [],
		hotWords: [],
		searchResult: false,
		query: '',
		loading: false,
		loadingCenter: false
	},

	attached() {
		// 历史记录
		const historyWords = keywordModel.getHistory();
		this.setData({
			historyWords
		})
		// 热门搜索
		keywordModel.getHot().then(res => {
			this.setData({
				hotWords: res.hot
			})
		})
	},

	methods: {
		onCancel(event) {
			this.initialize();
			this.triggerEvent('cancel', {}, {})
		},
		// 电脑按回车键，手机输入法中按完成键触发
		onConfirm(event) {
			// 1、显示查询的结果组件
			// 2、还没有数据时，显示加载loading中
			this.setData({
				searchResult: true,
				loadingCenter: true
			})
			// 3、初始化数据
			this.initialize();
			// 4、设置查询字符串
			const query = event.detail.value || event.detail.text;
			this.setData({
				query
			})
			// 5、请求查询的结果
			booksModel.search(0, query).then(res => {
				this.setMoreData(res.books);
				this.setTotal(res.total);
				keywordModel.addToHistory(query);
				this.setData({
					loadingCenter: false
				})
			})
		},
		onDelete(event) {
			this.initialize();
			this.setData({ // input框最后面的叉图片，点击把文本去掉
				searchResult: false,
				query: ''
			})
		},
		loadMore() {
			// 1、如果首次查询就没有书籍，则不往下执行
			if (!this.data.query) {
				return
			}
			// 2、如果锁住了，就不往下执行
			if (this.isLocked()) {
				return
			}
			// 3、根据第一次请求后台返回的total总条数，判断是否还有更多书籍
			if (this.hasMore()) {
				this.locked(); // 有更多数据，则锁住
				booksModel.search(this.getCurrentStart(), this.data.query)
					.then(res => {
						this.setMoreData(res.books)
						this.unLocked(); // 加载完，解锁
					}, () => {
						this.unLocked()
					})
				// 死锁
			}
		},

	},
})
