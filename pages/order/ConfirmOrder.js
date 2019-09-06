// pages/order/ConfirmOrder.js
const netUtils = getApp().netUtils;
const apis = getApp().apis;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userName: "",
        phoneNumber: "",
        address: "",
        leaveMessage: "",
        totalPrice: 0.0,
        productList: [],
        addOrderType: 0,//添加订单类型 0 是从购物车添加  1 从订单直接添加
        buyCount: 0,
        addressId: -1
    },
    submitOrder: function () {
        if (this.data.productList === 0 || this.data.productList === undefined) {
            return
        }
        if (this.addressId < 0) {
            getApp().toast.fail("请选择地址");
        }
        let orderList = this.data.productList.map((item) => {
            return {
                cartId: item.cartId,
                productId: item.productId,
                buyCount: item.buyCount,
            }
        });
        if (this.data.addOrderType === 0) {
            netUtils.post(apis.order_add, {
                cartList: orderList,
                userId: getApp().globalData.userId,
                totalPrice: this.data.totalPrice,
                leaveMessage: this.data.leaveMessage
            }).then((response) => {
                wx.redirectTo({
                    url: "/pages/orderlist/orderlist?active=" + 0 //0是新添加的
                })
            })
        } else {
            let productIdList = this.data.productList.map((item) => {
                return {
                    productId: item.productId,
                    buyCount: item.buyCount
                };
            })
            netUtils.post(apis.order_add_good, {
                productIdList: productIdList,
                buyCount: this.data.buyCount,
                userId: getApp().globalData.userId,
                totalPrice: this.data.totalPrice,
                leaveMessage: this.data.leaveMessage
            }).then((response) => {
                wx.redirectTo({
                    url: "/pages/orderlist/orderlist?active=" + 0
                })
            })
        }

    },
    selectAddress: function () {
        wx.navigateTo({
            url: "/pages/address/address"
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let addOrderType = Number(options.addOrderType);
        this.setData({
            addOrderType: addOrderType
        });
        if (addOrderType === 0) {
            this.loadCardProduct(options)
        } else {
            this.loadProductToOrder(options);
        }
        //加载默认地址
        this.loadDefaultAddress();
    },
    /**
     * 从物品直接添加订单
     * @param options
     */
    loadProductToOrder(options) {
        let productList = JSON.parse(decodeURIComponent(options.productList));
        if (productList === null || productList === undefined) {
            return
        }
        let totalCount = 0;
        let totalPrice = this.getSelectTotalPrice(productList);
        this.setData({
            productList: productList,
            totalPrice: totalPrice,
            buyCount: totalCount,
        })
    },
    /**
     * 从购物车添加订单
     * @param options
     */
    loadCardProduct(options) {
        let orderModel = JSON.parse(decodeURIComponent(options.orderModel));
        if (orderModel === null || orderModel === undefined) {
            return
        }
        let cartIdList = orderModel.orderList.map((item) => {
            return item.productCart.cartId;
        });
        this.loadProductList(cartIdList);
    },

    /*
    * 加载商品列表
    * */
    loadProductList(cartIdList) {
        netUtils.post(apis.cart_product_list, {
            cartIdJson: JSON.stringify(cartIdList)
        }).then((response) => {
            if (response.data === undefined) {
                return
            }
            let list = response.data.map((item) => {
                return {
                    productName: item.productDetail.productName,
                    productPrice: item.productDetail.productPrice,
                    productId: item.productDetail.productId,
                    cartId: item.productCart.cartId,
                    marketPrice: item.productDetail.marketPrice,
                    buyCount: item.productCart.cartCount,
                    imageUrl: item.productDetail.imageUrl
                }
            });
            let totalPrice = this.getSelectTotalPrice(list);
            this.setData({
                productList: list,
                totalPrice: totalPrice
            })
        })
    },

    loadDefaultAddress() {
        netUtils.get(apis.load_default_address, {
            userId: getApp().globalData.userId
        }).then((response) => {
            this.setData({
                userName: response.data.userName,
                phoneNumber: response.data.phoneNumber,
                address: response.data.province + response.data.city + response.data.area + response.data.defineAddress,
            })
        })
    },
    /**
     * 获取总价格
     * @returns {number}
     */
    getSelectTotalPrice(cartList) {
        let totalPrice = 0.0;
        cartList.map((item) => {
            totalPrice = item.productPrice * item.buyCount + totalPrice;
        });
        return totalPrice * 100;
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})