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
        cartCount: 0
    },
    //添加预定
    submitOrder: function (event) {
        let index = event.currentTarget.dataset.index;
        let buyCount = this.data.reserveList[index].buyCount;
        this.setData({
            submitType: 1,
            buyCount: buyCount,
            show: true,
            index: index,
            productName: this.data.reserveList[index].productName,
            unitName:
            this.data.reserveList[index].unit,
        });

    },
    //添加购物车
    submitCart: function (event) {
        let index = event.currentTarget.dataset.index;
        let buyCount = this.data.reserveList[index].buyCount;
        this.setData({
            submitType: 0,
            buyCount: buyCount,
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
        let index = this.data.index
        let productDetail = this.data.reserveList[index];
        if (this.data.submitType === 0) {
            netUtils.post(apis.reserve_cart_add, {
                userId: getApp().globalData.userId,
                productId: productDetail.productId,
                cartCount: productDetail.buyCount,
            }).then((response) => {
                this.setData({
                    buyCount: 1,
                    cartCount: this.data.cartCount + productDetail.buyCount
                });
                this.loadReserveList();
                getApp().toast.success('添加购物车成功');
            }).catch((error) => {
                Toast(error.msg);
            })
        } else {
            let productList = [];
            productList.push({
                productId: productDetail.productId,
                buyCount: productDetail.buyCount,
                productName: productDetail.productName,
                productPrice: productDetail.productPrice,
                marketPrice: productDetail.marketPrice,
                imageUrl: productDetail.imageUrl
            })
            this.loadReserveList();
            let orderModelJson = JSON.stringify(productList);
            wx.navigateTo({
                url: "../order/ConfirmOrder?addOrderType=" + 1 + "&productList=" + encodeURIComponent(orderModelJson)
            })
        }
    },
    //切换到购物车
    switchCart(event) {
        if (this.data.cartCount > 0) {
            wx.switchTab({
                url: "/pages/cart/cart"
            });
        }
    },
    onChangeReserveCount(event) {
        let index = this.data.index;
        let list = this.data.reserveList;
        list[index].buyCount = event.detail
        this.setData({
            reserveList: list
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
        this.loadCartCount();
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.loadReserveList();
        this.loadCartCount();
    },
    getUserInfo: function (e) {
        app.globalData.userInfo = e.detail.userInfo;
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },
    /**
     * 加载购物车中的数量
     */
    loadCartCount() {
        netUtils.get(apis.cart_total_count, {
            userId: getApp().globalData.userId
        }).then((response) => {
            this.setData({
                cartCount: response.data !== undefined ? response.data : 0
            })
        })
    },
    loadReserveList() {
        netUtils.get(apis.reserve_good_list, {}).then((response) => {
            if (response.data === undefined) {
                return
            }
            let list = response.data.map((item) => {
                return {
                    productId: item.productId,
                    productName: item.productName,
                    productPrice: item.productPrice,
                    imageUrl: item.imageUrl,
                    marketPrice: item.marketPrice,
                    sellOutCount: item.sellOutCount,
                    productFinishTime: item.productFinishTime,
                    unit: item.unit,
                    address: item.address,
                    buyCount: 1,
                }
            })
            this.setData({
                reserveList: list,
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
