//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        show: false,
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        goodName: "",
        unitName: "",
        reserveList: [
            {
                reserveName: "苹果",
                price: 21.3,
                oldPrice: 45.7,
                unit: '斤',
                imageUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566104373789&di=9c8d0d6afa79784898821f2b0b0c746b&imgtype=0&src=http%3A%2F%2Fwww.chinadaily.com.cn%2Fhqzx%2Fimages%2Fattachement%2Fjpg%2Fsite385%2F20120924%2F00221918200911ca40e52b.jpg"

            }, {
                reserveName: "苹果",
                price: 21.3,
                unit: '斤',
                imageUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566104373789&di=9c8d0d6afa79784898821f2b0b0c746b&imgtype=0&src=http%3A%2F%2Fwww.chinadaily.com.cn%2Fhqzx%2Fimages%2Fattachement%2Fjpg%2Fsite385%2F20120924%2F00221918200911ca40e52b.jpg"
            },
            {
                reserveName: "苹果",
                price: 21.3,
                unit: '斤',
                imageUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566104373789&di=9c8d0d6afa79784898821f2b0b0c746b&imgtype=0&src=http%3A%2F%2Fwww.chinadaily.com.cn%2Fhqzx%2Fimages%2Fattachement%2Fjpg%2Fsite385%2F20120924%2F00221918200911ca40e52b.jpg"
            }
        ],
    },
    //事件处理函数
    reserveGood: function (event) {
        let index = event.currentTarget.dataset.index;
        this.setData({
            show: true,
            goodName: this.data.reserveList[index].reserveName,
            unitName: this.data.reserveList[index].unit,
        });

    },
    onClose: function () {
        console.log("eee");
    },
    /*提交数量*/
    submitGood: function () {
        console.log("ddd");
    },
    onChangeReserveCount(event) {
        console.log(event.detail)
    },
    onChange(event) {
        this.setData({
            active: event.detail
        })
        if (this.data.active === 0) {
            wx.navigateTo({
                url: "../reserve/ReserveList"
            });
        }

        console.log(event.detail);
    },
    onLoad: function () {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
    },
    getUserInfo: function (e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    }
})
