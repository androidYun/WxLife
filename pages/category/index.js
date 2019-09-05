// pages/component/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        active: 0,
        selectCategoryIndex: 0,
        totalPrice: 0,
        totalPrice: 0.0,
        categoryName: "水果",
        categoryList: [{
            categoryId: 1,
            categoryName: "水果"
        }, {
            categoryId: 2,
            categoryName: "坚果"
        }, {
            categoryId: 3,
            categoryName: "蔬菜"
        }, {
            categoryId: 4,
            categoryName: "花菜"
        }, {
            categoryId: 5,
            categoryName: "吃饭"
        }],
        productList: [
            {
                productId: 26,
                productName: "苹果",
                productPrice: 56.0,
                marketPrice: 65.0,
                sellCount: 32,
                imageUrl: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1487351610,315303232&fm=26&gp=0.jpg"
            }, {
                productId: 4,
                productName: "苹果",
                productPrice: 56.0,
                marketPrice: 65.0,
                sellCount: 32,
                imageUrl: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1487351610,315303232&fm=26&gp=0.jpg"
            }
        ],
        addProductList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log("ddddd");
    },

    selectCategory: function (event) {
        let index = event.currentTarget.dataset.index;
        this.setData({
            selectCategoryIndex: index
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
        console.log("tttt")
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
        })
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