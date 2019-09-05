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
        productName: "",
        unitName: "",
        buyCount: 1,
        index: 0,
        submitType: 0, //0是添加购物车  1 是添加订单
        reserveList: [],
    },
    //事件处理函数
    submitOrder: function (event) {
        let index = event.currentTarget.dataset.index;
        this.setData({
            submitType: 1,
            show: true,
            index: index,
            productName: this.data.reserveList[index].productName,
            unitName:
            this.data.reserveList[index].unit,
        });

    },
    //事件处理函数
    submitCart: function (event) {
        let index = event.currentTarget.dataset.index;
        this.setData({
            submitType: 0,
            show: true,
            index: index,
            productName: this.data.reserveList[index].productName,
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
        let productDetail = this.data.reserveList[index];
        if (this.data.submitType === 0) {
            netUtils.post(apis.reserve_cart_add, {
                userId: getApp().globalData.userId,
                productId: productDetail.productId,
                cartCount: this.data.buyCount,
            }).then((response) => {
                this.setData({
                    buyCount: 1,
                });
                this.loadReserveList();
            }).catch((error) => {
                Toast(error.msg);
            })
        } else {
            let productList = [];
            productList.push({
                productId: productDetail.productId,
                buyCount: this.data.buyCount,
                productName: productDetail.productName,
                productPrice: productDetail.productPrice,
                marketPrice: productDetail.marketPrice,
                imageUrl: productDetail.imageUrl
            })
            let orderModelJson = JSON.stringify(productList);
            wx.navigateTo({
                url: "../order/ConfirmOrder?addOrderType=" + 1 + "&productList=" + encodeURIComponent(orderModelJson)
            })
        }
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
            this.hideLoading();
        }).catch((error) => {
            this.hideLoading();
        })
    },
    onPullDownRefresh: function () {
        this.loadReserveList();
    },
    hideLoading: function () {
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
    }
});
