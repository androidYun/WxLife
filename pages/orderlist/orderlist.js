// pages/orderlist/orderlist.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        active: 0,
        orderTime: "2019-09-03 23:15:16",
        orderStatus: "待支付",
        orderNumber: "11666644556666",
        imageUrlList: ["https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2121206715,2955288754&fm=26&gp=0.jpg", "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2121206715,2955288754&fm=26&gp=0.jpg", "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2121206715,2955288754&fm=26&gp=0.jpg", "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2121206715,2955288754&fm=26&gp=0.jpg"],
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