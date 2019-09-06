// pages/orderlist/orderlist.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        active: 0,
        orderTime: "",
        orderStatus: "",
        orderNumber: "",
        imageUrlList: [],
        totalPrice: 963.56
    },
    onChangeTab: function (event) {
        if (event.detail.index === 0) {
            this.newOrder.loadOrderList();
        } else if (event.detail.index === 1) {
            this.waitDelivery.loadOrderList();
        } else if (event.detail.index === 2) {
            this.finishOrder.loadOrderList();
        } else if (event.detail.index === 3) {
            this.alreadyCancel.loadOrderList();
        }

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //通过id获取组件component
        this.newOrder = this.selectComponent("#newOrder")
        this.waitDelivery = this.selectComponent("#waitDelivery")
        this.finishOrder = this.selectComponent("#finishOrder")
        this.alreadyCancel = this.selectComponent("#alreadyCancel")
        this.setData({
            active: options.active
        })
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