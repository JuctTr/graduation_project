/**
 * 格式化时间
 * @param {Number} date 
 */
const formatTime = date => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hour = date.getHours()
	const minute = date.getMinutes()
	const second = date.getSeconds()

	return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
	n = n.toString()
	return n[1] ? n : '0' + n
}
const dateFormat = (data, format) => {

}

const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
/**
 * @description 生成随机数
 * @param {Number} n 
 */
const random = function generateMixed(n) {
	var res = "";
	for (var i = 0; i < n; i++) {
		var id = Math.ceil(Math.random() * 35);
		res += chars[id];
	}
	return res;
}

/**
 * @description // 利用日期的先后发表，排序
 * @param {Object} source 
 * @param {String} dateString 每一个对象中的日期key
 */
const sortFromDate = function (source, dateString = 'time') {
	return source.sort((a, b) => { 
        if (Date.parse(a[dateString]) <= Date.parse(b[dateString])) {
            return 1;
        }
        return -1;
    })
}

/**
 * @description 把时间格式化成 2020-05-03 16:27
 * @param {String} time 
 */
const dealDateData = function (time) {
	let date = new Date(time);

	// 年月日
	const year = date.getFullYear();
	const month = ('0' + (date.getMonth() + 1)).slice(-2);
	const day = ('0' + date.getDate()).slice(-2);
	// 时分秒
	const hour = ('0' + date.getHours()).slice(-2);
	const minute = ('0' + date.getMinutes()).slice(-2);
	const second = ('0' + date.getSeconds()).slice(-2);

	return `${year}-${month}-${day} ${hour}:${minute}`;

}

export {
	formatTime,
	random,
	dealDateData,
	sortFromDate
}


