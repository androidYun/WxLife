// pages/address/address.js
const apis = getApp().apis;
const netUtils = getApp().netUtils;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        addressList: []

    },
    addAddress: function () {
        wx.navigateTo({
            url: "/pages/address/add/add"
        });
    },
    editAddress: function (event) {
        let index = event.currentTarget.dataset.index;
        let params = "addressId=" + this.data.addressList[index].addressId + "&type=1"
        wx.navigateTo(
            {
                url: "/pages/address/add/add?" + params,
            }
        )
    },
    deleteAddress: function (event) {
        let index = event.currentTarget.dataset.index;
        let addressId = this.data.addressList[index].addressId;
        netUtils.get(apis.address_delete + "/" + addressId).then((response => {

        }))
    },
    defaultAddressChange: function (event) {
        let index = event.currentTarget.dataset.index;
        let addressId = this.data.addressList[index].addressId;
        let dataList = this.data.addressList;
        netUtils.get(apis.address_set_default + "/" + addressId).then((response => {
            dataList.map((item) => {
                item.default = false;
            })
            dataList[index].default = true;
            this.setData({
                addressList: dataList
            })
        }))
    },
    selectAddress(event) {
        let index = event.currentTarget.dataset.index;
        let pages = getCurrentPages();
        let prePage = pages[pages.length - 2];
        let address = this.data.addressList[index];
        prePage.setData({
            addressId: address.addressId,
            userName: address.userName,
            phoneNumber: address.phoneNumber,
            address: address.province + address.city + address.area + address.defineAddress
        })
        wx.navigateBack({
            delta: 1
        })

    },
    loadAddressList() {
        netUtils.get(apis.address_list, {userId: 1}).then((response => {
            this.setData(
                {
                    addressList: response.data
                }
            )
        }))
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.loadAddressList();
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
        this.loadAddressList()
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