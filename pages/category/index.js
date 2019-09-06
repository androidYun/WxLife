// pages/component/index.js
import Toast from '../../lib/toast/toast';

const apis = getApp().apis;
const netUtils = getApp().netUtils;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        active: 0,
        selectCategoryIndex: 0,
        totalPrice: 0.0,
        categoryName: "水果",
        categoryList: [],
        productList: [],
        addProductList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.loadCategoryList();
    },

    loadCategoryList() {
        netUtils.get(apis.product_category_list).then((response) => {
            this.setData({
                categoryList: response.data !== undefined ? response.data : []
            });
        })
    },

    loadProductList(categoryId) {
        netUtils.get(apis.reserve_good_list, {
            categoryId: categoryId
        }).then((response) => {
            this.setData({
                productList: response.data !== undefined ? response.data : []
            });
        })
    },

    selectCategory: function (event) {
        let index = event.currentTarget.dataset.index;
        this.loadProductList(this.data.categoryList[index].categoryId);
        this.setData({
            selectCategoryIndex: index,
            categoryName: this.data.categoryList[index].categoryName
        })
    },
    /*
    改变数量
     */
    changeProductCount(event) {
        let count = event.detail;
        let index = event.currentTarget.dataset.index;
        let addProductList = this.data.addProductList;
        let productDetail = this.data.productList[index];
        let isAlreadyObject = this.isAlreadyAdd(addProductList, productDetail.productId);
        if (isAlreadyObject.isAlready) {
            if (count === 0) {
                delete addProductList[isAlreadyObject.index];
            } else {
                addProductList[isAlreadyObject.index].buyCount = count;
            }
        } else {
            addProductList.push({
                buyCount: count,
                productId: productDetail.productId,
                productPrice: productDetail.productPrice,
                imageUrl: productDetail.imageUrl,
                productName: productDetail.productName,
                marketPrice: productDetail.marketPrice,
            })
        }

        let totalPrice = this.loadTotalPrice(addProductList);
        let totalCount = this.loadTotalCount(addProductList);
        this.setData({
            addProductList: addProductList,
            totalPrice: totalPrice,
            totalCount: totalCount
        })
    },

    addProductOrder(event) {
        let productList = this.data.addProductList;
        if (productList.length <= 0) {
            getApp().toast.fail('请选择需要添加的商品');
            return
        }
        let orderModelJson = JSON.stringify(productList);
        wx.navigateTo({
            url: "../order/ConfirmOrder?addOrderType=" + 1 + "&productList=" + encodeURIComponent(orderModelJson)
        })
    },

    isAlreadyAdd(addProductList, productId) {
        for (let index = 0; index < addProductList.length; index++) {
            if (addProductList[index].productId === productId) {
                return {
                    isAlready: true,
                    index: index
                };
            }
        }
        return {
            isAlready: false,
            index: -1
        };
    },
    loadTotalPrice(addProductList) {
        let totalPrice = 0.0
        addProductList.forEach((product) => {
            totalPrice += (product.productPrice * product.buyCount)
        })
        return totalPrice;
    },
    loadTotalCount(addProductList) {
        let totalCount = 0
        addProductList.forEach((product) => {
            totalCount += product.buyCount;
        });
        return totalCount;
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