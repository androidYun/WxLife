// pages/cart/ShopCart.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        allPrice: 0.0,
        icon: {
            normal: '//img.yzcdn.cn/icon-normal.png',
            active: '//img.yzcdn.cn/icon-active.png'
        },
        shopCart: [
            {
                reserve_id: "",
                goodName: "苹果",
                desc: "吃水饺打豆豆",
                imageUrl: "",
                price: 21.3,
                oldPrice: 45.7,
                count: 0,
                isSelect: true
            },
            {
                reserve_id: "",
                goodName: "苹果",
                desc: "吃水饺打豆豆",
                imageUrl: "",
                price: 21.3,
                oldPrice: 45.7,
                count: 0,
                isSelect: false
            }
        ]
    },
    submitOrder: function (event) {

    },
    /**
     * 选择需要购买的订单
     */
    onSelectChange() {

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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