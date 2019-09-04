// pages/reserveorder/ReserveOrder.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        show: false,
        productName: "",
        goodUnit: "",
        buyCount: 1,
        operationIndex: 0,
        reserveOrderList: [
            {
                orderState: 0,
                goodUnit: "个",
                buyCount: 10,
                productName: "香蕉",
                productDesc: "香蕉大又甜",
                productPrice: 3,
                marketPrice: 5,
                imageUrl: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1487351610,315303232&fm=26&gp=0.jpg"
            },
          {
            orderState: 1,
            goodUnit: "个",
            buyCount: 10,
            productName: "香蕉",
            productDesc: "香蕉大又甜",
            productPrice: 3,
            marketPrice: 5,
            imageUrl: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1487351610,315303232&fm=26&gp=0.jpg"
          }
        ]
    },
    /**
     * 编辑此订单的数量
     * @param event
     */
    editReserveOrder: function (event) {
        let index = event.currentTarget.dataset.index;
        this.setData(
            {
                operationIndex: index,
                show: true,
                productName: this.data.reserveOrderList[index].productName,
                goodUnit: this.data.reserveOrderList[index].goodUnit,
                buyCount: this.data.reserveOrderList[index].buyCount,
            }
        )

    },
    /*动态改变数量*/
    onChangeReserveCount: function () {


    },
    submitGood: function () {


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