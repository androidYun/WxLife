// component/orderitem.js
const apis = getApp().apis;
const netUtils = getApp().netUtils;
import Toast from '../../../lib/toast/toast';

Component({
    lifetimes: {
        attached: function () {
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
        orderList: []
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
                let orderProductList = response.data.map((item) => {
                        if (item !== undefined) {
                            let orderStatusName = this.getOrderStatusName();
                            let imageUrlList = this.getImageList(item.orderProductItemDetailList)
                            return {
                                orderId: item.orderId,
                                orderTime: item.orderTime,
                                orderStatusName: orderStatusName,
                                totalPrice: item.totalPrice,
                                leaveMessage: item.leaveMessage,
                                orderStatus: item.orderStatus,
                                userId: item.userId,
                                imageUrlList: imageUrlList
                            }
                        }
                    }
                );
                this.setData({
                    orderList: orderProductList
                });
            });

        },
        getImageList(orderProductList) {
            let imageUrlList = [];
            orderProductList.forEach((item, index) => {
                if (item.productDetail !== undefined && item.productDetail.imageUrl !== undefined) {
                    imageUrlList.push(item.productDetail.imageUrl);
                }
            })
            return imageUrlList;
        },
        cancelOrder(event) {
            let index = event.currentTarget.dataset.index;
            let orderId = this.data.orderList[index].orderId;
            netUtils.get(apis.cancel_order, {
                orderId: orderId
            }).then((response) => {
                this.loadOrderList();
                Toast("取消订单成功")
            })
        }
    },

})
;
