const base_url = "http://127.0.0.1:8084/api/";
module.exports = {
    wx_login: base_url + "wx/login",//预购商品列表
    reserve_good_list: base_url + "reserve/list",//预购商品列表
    reserve_good_detail: base_url + "reserve",//预购商品列表
    order_add: base_url + "order/add",//添加预购订单
    order_add_good: base_url + "order/addGood",//直接添加到订单
    community_list: base_url + "community/listDetail",//社区列表

    /*购物车接口连接*/
    cart_list: base_url + "cart/list",//获取全部
    reserve_cart_add: base_url + "cart/add",//添加
    reserve_cart_delete: base_url + "cart/delete",//删除
    reserve_cart_update: base_url + "cart/update",//更新
    reserve_cart_update_count: base_url + "cart/updateCount",//更新数量
    cart_product_list: base_url + "cart/cartProductList",//购物车商品列表
    /*地址接口*/
    load_default_address: base_url + "address/default",//默认地址
    address_add: base_url + "address/add",//添加地址
    address_detail: base_url + "address",//获取地址详情
    address_list: base_url + "address/list",//添加地址
    address_delete: base_url + "address/delete",//删除地址
    address_set_default: base_url + "address/default",//删除地址
    address_update: base_url + "address/update",//更新
    /*订单接口*/
    order_list: base_url + "order/list"//获取订单列表

};