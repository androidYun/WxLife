const base_url = "http://localhost:8084/";
module.exports = {
    reserve_good_list: base_url + "reserve/list",//预购商品列表
    reserve_order_add: base_url + "reserve/order/add",//添加预购订单
    community_list: base_url + "community/listDetail",//社区列表
    address_add: base_url + "address/add",//添加地址
    address_detail: base_url + "address",//获取地址详情
    address_list: base_url + "address/list",//添加地址
    address_delete: base_url + "address/delete",//删除地址
    address_set_default: base_url + "address/default",//删除地址
    address_update: base_url + "address/update",//更新
};