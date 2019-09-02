const base_url = "http://localhost:8084/api/";
module.exports = {
    wx_login: base_url + "wx/login",//预购商品列表
    reserve_good_list: base_url + "reserve/list",//预购商品列表
    order_add: base_url + "order/add",//添加预购订单
    community_list: base_url + "community/listDetail",//社区列表
    address_add: base_url + "address/add",//添加地址
    address_detail: base_url + "address",//获取地址详情
    address_list: base_url + "address/list",//添加地址
    address_delete: base_url + "address/delete",//删除地址
    address_set_default: base_url + "address/default",//删除地址
    address_update: base_url + "address/update",//更新
    /*购物车接口连接*/
    reserve_cart_add: base_url + "cart/add",//添加
    cart_list: base_url + "cart/list",//获取全部
    reserve_cart_delete: base_url + "cart/delete/",//删除
    reserve_cart_update: base_url + "cart/update",//更新
};