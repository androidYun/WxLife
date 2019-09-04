// component/orderitem.js
const apis = getApp().apis;
const netUtils = getApp().netUtils;
Component({
    lifetimes: {

        ready: function () {
            this.loadOrderList();
        }
    },
    /**
     * 组件的属性列表
     */
    properties: {
        order_status: {
            type: Number,
            values: 0
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        orderList: [
            {
                orderTime: "ddssdsd",
                name: "item.orderTime",
                totalPrice: "item.totalPrice",
                leaveMessage: 'item.leaveMessage',
                orderStatus: "item.orderStatus",
                userId: "item.userId",
                productImageList: ["https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2121206715,2955288754&fm=26&gp=0.jpg", "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2121206715,2955288754&fm=26&gp=0.jpg", "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2121206715,2955288754&fm=26&gp=0.jpg", "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2121206715,2955288754&fm=26&gp=0.jpg"],

            }
        ]
    },

    /**
     * 组件的方法列表
     */
    methods: {
        getOrderStatusName: function () {
            if (this.properties.order_status === 0) {
                return "新订单";
            } else if (this.properties.order_status === 1) {
                return "待发货";
            } else if (this.properties.order_status === 2) {
                return "已完成";
            } else if (this.properties.order_status === 3) {
                return "已取消";
            }
        },
        loadOrderList() {
            netUtils.get(apis.order_list, {
                userId: getApp().globalData.userId,
                orderStatus: this.properties.order_status
            }).then((response) => {
                if (response.data === undefined) {
                    return
                }
                let orderProductList = response.data.filter((item) => {
                        if (item !== undefined) {
                            return {
                                orderTime: item.orderTime,
                                orderStatusName: item.orderTime,
                                totalPrice: item.totalPrice,
                                leaveMessage: item.leaveMessage,
                                orderStatus: item.orderStatus,
                                userId: item.userId,
                                productImageList: ["", "", ""]
                            }
                        }
                    }
                );
                console.log("ddd" + orderProductList[0])
                this.setData({
                    orderList: orderProductList
                });
            });

        },
        getImageList(orderProductList) {
            orderProductList.map((item) => {
                console.log("看书" + item);
                return "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2121206715,2955288754&fm=26&gp=0.jpg"
            })
        }
    },

})
;
