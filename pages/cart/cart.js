// pages/cart/ShopCart.js
const netUtils = getApp().netUtils;
const apis = getApp().apis;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        allPrice: 0.0,
        isAllSelect: false,
        cartList: []
    },
    /**
     * 提交订单
     * @param event
     */
    submitOrder: function (event) {
        let orderList = this.data.cartList.map((item) => {
            if (item.isSelect) {
                return {
                    cartId: item.productCart.cartId,
                    productId: item.productCart.productId,
                    buyCount: item.productCart.cartCount
                }
            }
        });
        netUtils.post(apis.order_add, {
            cartList: orderList,
            userId: getApp().globalData.userId,
            totalPrice: 36.0,
            leaveMessage: "11点才到家"
        }).then((response) => {
            console.log("成功了");
            this.loadCartList();
        })
    },
    /**
     * 选择需要购买的订单
     */
    onSelectChange(event) {
        let index = event.currentTarget.dataset.index;
        let list = this.data.cartList;
        list[index].isSelect = !list[index].isSelect;
        this.setData({
            cartList: list
        })
    },
    onAllSelect() {
        let list = this.data.cartList;
        list.forEach((item, index) => {
            list[index].isSelect = !this.data.isAllSelect;
        });
        this.setData({
            cartList: list,
            isAllSelect: !this.data.isAllSelect
        })
    },
    loadCartList: function () {
        netUtils.get(apis.cart_list, {
            userId: getApp().globalData.userId
        }).then((response) => {
            if (response.data !== undefined && response.data.length > 0) {
                response.data[0].isSelect = true
            }
            this.setData({
                cartList: response.data
            });

        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.loadCartList();
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