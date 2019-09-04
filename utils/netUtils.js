const storageUtils = require("../utils/StorageUtils");
module.exports = {

    get(url, data) {
        return new Promise((resolve, reject) => {
            wx.request({
                url: url,
                data: data,
                header: {
                    'content-type': 'application/json;charset=urf-8', // 默认值
                    "token": storageUtils.getToken()
                },
                method: "GET",
                success: function (response) {
                    if (response.statusCode === 200 && response.data.code === 200) {
                        resolve(response.data);
                    } else {
                        reject({
                            code: response.data.code,
                            msg: response.data.message
                        })
                    }
                },
                fail: function (response) {
                    reject({
                        code: 0,
                        msg: response.errMsg
                    })
                }
            })
        })
    },
    post(url, data) {
        return new Promise((resolve, reject) => {
            wx.request({
                url: url,
                data: JSON.stringify(data),
                header: {
                  'content-type': 'application/json;charset=utf-8', // 默认值
                    "token": storageUtils.getToken()
                },
                method: "POST",
                success: function (response) {
                    if (response.statusCode === 200 && response.data.code === 200) {
                        resolve(response.data);
                    } else {
                        reject({
                            code: response.data.code,
                            msg: response.data.message
                        })
                    }
                },
                fail: function (response) {
                    reject({
                        code: 0,
                        msg: response.errMsg
                    })
                }
            })
        })
    }
};
