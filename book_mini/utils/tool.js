
const defaultImgUrl = "http://localhost:3000/images/animal.png"; // 临时的url，之后要替换

export {
    dealLatestData,
}

/**
 * @param {Object} source 后台传回来没经过处理的源数据
 */
function dealLatestData (source) {
    const result = initReturnResult();

    



}

function initReturnResult () {
    const result = [{
        like_status: 0,
        cardType: 100,
        frontData: {
            img: defaultImgUrl,
            pubdate: '2020-01-01',
            fav_nums: 0,
        },
        backData: {
            content: '',
            title: '',
        }
    }];
    return result;
}