
const defaultImgUrl = "http://192.168.0.13:3000/images/animal.png"; // 临时的url，之后要替换

export {
    dealIndexData,
}

/**
 * @param {Object} source 后台传回来没经过处理的源数据
 */
function dealIndexData (source) {
    const result = [];

    let len = source.length;
    let tempId = 0;
    source.sort((a, b) => { // 利用日期的先后发表，往每一个数组里面push一个index期刊字段
        if (Date.parse(a.pubdate) <= Date.parse(b.pubdate)) {
            return 1;
        }
        return -1;
    }).forEach((item) => {
        const initData = initReturnResult();
        item.index = len--;
        item.id = tempId++;
        const {
            id,
            index,
            like_status,
            type,
            image,
            back_image,
            title,
            content,
            pubdate,
            fav_nums,
            url,
        } = item;
        initData.frontData = {
            img: image,
            pubdate,
            fav_nums,
        }
        initData.backData = {
            content,
            title,
            img: back_image,
        }
        initData.id = id;
        initData.index = index;
        initData.like_status = like_status;
        initData.cardType = type;
        initData.url = url;
        result.push(initData);
    });
    

    return result;
}

function initReturnResult () {
    const result = {
        like_status: 0,
        cardType: 100,
        index: 0,
        frontData: {
            img: defaultImgUrl,
            pubdate: '2020-01-01',
            fav_nums: 0,
        },
        backData: {
            content: '',
            title: '',
            img: ''
        }
    }
    return result;
}