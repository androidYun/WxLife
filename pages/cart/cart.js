// pages/cart/ShopCart.js
const netUtils = getApp().netUtils;
const apis = getApp().apis;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        totalPrice: 0.0,
        isAllSelect: false,
        cartList: []
    },
    /**
     * 提交订单
     * @param event
     */
    submitOrder: function (event) {
        let orderList = this.data.cartList.filter((item) => {
            if (item.isSelect) {
                return {
                    cartId: item.productCart.cartId,
                    productId: item.productCart.productId,
                    buyCount: item.productCart.cartCount
                }
            }
        });
        if (orderList.length === 0) {
            return
        }
        let orderModel = {
            orderList: orderList,
            totalPrice: this.data.totalPrice
        };
        let orderModelJson = JSON.stringify(orderModel);
        wx.navigateTo({
            url: "../order/ConfirmOrder?orderModel=" + encodeURIComponent(orderModelJson) + "&addOrderType=0"
        })
    },
    /**
     * 删除购物车
     */
    deleteCart(event) {
        let index = event.currentTarget.dataset.index;
        let cartId = this.data.cartList[index].productCart.cartId;
        netUtils.get(apis.reserve_cart_delete + "/" + cartId).then((response) => {
            this.loadCartList()
        })
    },
    /**
     * 选择需要购买的订单
     */
    onSelectChange(event) {
        let index = event.currentTarget.dataset.index;
        let list = this.data.cartList;
        list[index].isSelect = !list[index].isSelect;
        let totalPrice = this.getSelectTotalPrice(list);
        this.setData({
            cartList: list,
            totalPrice: totalPrice
        })
    },
    /**
     * 全选
     */
    onAllSelect() {
        let list = this.data.cartList;
        list.forEach((item, index) => {
            list[index].isSelect = !this.data.isAllSelect;
        });
        let totalPrice = this.getSelectTotalPrice(list);
        this.setData({
            cartList: list,
            isAllSelect: !this.data.isAllSelect,
            totalPrice: totalPrice
        })
    },

    isAllSelect(list) {
        list.forEach((item, index) => {
            if (!item.isSelect) {
                return false
            }
        });
        return true;
    },
    /**
     * 加载购物车里面的商品
     */
    loadCartList() {
        netUtils.get(apis.cart_list, {
            userId: getApp().globalData.userId
        }).then((response) => {
            if (response.data === undefined || response.data.length === 0) {
                this.setData({
                    cartList: [],
                });
                return
            }
            if (response.data.length > 0) {
                response.data[0].isSelect = true
            }
            let totalPrice = this.getSelectTotalPrice(response.data);
            this.setData({
                cartList: response.data,
                totalPrice: totalPrice
            });
            this.hideLoading();
        }).catch((error) => {
            this.hideLoading();
        })
    },
    /**
     * 获取总价格
     * @returns {number}
     */
    getSelectTotalPrice(cartList) {
        let totalPrice = 0.0;
        cartList.map((item) => {
            if (item.isSelect) {
                totalPrice = item.productDetail.productPrice * item.productCart.cartCount + totalPrice;
            }
        });
        return totalPrice * 100;
    },
    /**
     * 更新价格
     */
    updateTotalPrice() {
        let totalPrice = this.getSelectTotalPrice(this.data.cartList);
        this.setData({
            totalPrice: totalPrice
        })
    },
    /**
     * 选择物品数量的改变
     */
    onProductCountChange(event) {
        let index = event.currentTarget.dataset.index;
        let cartId = this.data.cartList[index].productCart.cartId;
        let cartCount = event.detail;
        //更新添加的数据
        netUtils.get(apis.reserve_cart_update_count, {
            cartId: cartId,
            cartCount: cartCount
        }).then((response) => {

        });
        let updateCartCount = 'cartList[' + index + '].productCart.cartCount';
        this.setData({
            [updateCartCount]: event.detail
        });
        this.updateTotalPrice();
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.loadCartList();
    },
    hideLoading: function () {
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
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
        this.loadCartList();
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