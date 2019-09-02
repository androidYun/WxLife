//index.js
//获取应用实例
const app = getApp()
const apis = require("../../utils/apis");
const netUtils = require("../../utils/netUtils");
import Toast from '../../lib/toast/toast';

Page({
    data: {
        show: false,
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        goodName: "",
        unitName: "",
        buyCount: 1,
        index: 0,
        reserveList: [],
    },
    //事件处理函数
    reserveGood: function (event) {
        let index = event.currentTarget.dataset.index;
        this.setData({
            show: true,
            index: index,
            goodName: this.data.reserveList[index].goodName,
            unitName:
            this.data.reserveList[index].unit,
        });

    },

    onClose: function () {
        console.log("eee");
    },
    /*提交数量*/
    submitGood: function (event) {
        let index = this.data.index;
        let userId = getApp().globalData.userId;
        console.log("内容" + userId);
        let reserveId = this.data.reserveList[index].reserveId;
        netUtils.post(apis.reserve_cart_add, {
            userId: getApp().globalData.userId,
            productId: reserveId,
            cardCount: this.data.buyCount,
        }).then((response) => {
            this.setData({
                buyCount: 1,
            });
            Toast("预定成功");
            this.loadReserveList();
        }).catch((error) => {
            Toast(error.msg);
        })
    },
    onChangeReserveCount(event) {
        this.setData({
            buyCount: event.detail
        });
    },
    onChange(event) {
        this.setData({
            active: event.detail
        });
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
                    app.globalData.userInfo = res.userInfo;
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
        this.loadReserveList();
    },
    getUserInfo: function (e) {
        app.globalData.userInfo = e.detail.userInfo;
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },
    loadReserveList() {
        netUtils.get(apis.reserve_good_list, {}).then((response) => {
            this.setData({
                reserveList: response.data
            })
        }).catch((error) => {
            console.log("dd" + error.msg)
        })
    }
});
