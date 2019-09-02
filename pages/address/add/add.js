// pages/address/add/add.js
import areaList from '../../../common/area'

const apis = require("../../../utils/apis");
const netUtils = require("../../../utils/netUtils");
let stringUtils = getApp().stringUtils;
Page({
    components: {areaList},

    /**
     * 页面的初始数据
     */
    data: {

        address: {
            userId: getApp().globalData.userId,
            addressId:0,
            userName: "",
            province: "",
            provinceId: "",
            cityId: "",
            city: "",
            areaId: "",
            area: "",
            communityId: 0,
            communityName: "",
            isDefault: false,
            phoneNumber: "",
            defineAddress: "",
        },
        provinceCityArea: "",
        isDefault: false,
        isShowArea: false,
        areaList: null,
        dialogShow: false,
        defaultCity: "110101",
        type: 0, //0是添加 1是编辑,
        operationBtn:"添加"
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad:

        function (options) {
            let type = parseInt(options.type);
            this.setData({
                areaList: areaList,
                type: type,
                operationBtn:type==1?"更新":"添加"
            });

            if (type === 1) {
                netUtils.get(apis.address_detail + "/" + options.addressId).then((response) => {
                    let address = response.data;
                    let provinceAddress = address.province + address.city + address.area;
                    console.log("地址" + address.defineAddress)
                    this.setData(
                        {
                            provinceCityArea: provinceAddress,
                            defaultCity: address.areaId,
                            'address.userId': getApp().globalData.userId,
                            'address.addressId': address.addressId,
                            'address.userName': address.userName,
                            'address.province': address.province,
                            'address.provinceId': address.provinceId,
                            'address.cityId': address.cityId,
                            'address.city': address.city,
                            'address.areaId': address.areaId,
                            'address.area': address.area,
                            'address.communityId': address.communityId,
                            'address.communityName': address.communityName,
                            'address.isDefault': address.isDefault,
                            'address.phoneNumber': address.phoneNumber,
                            'address.defineAddress': address.defineAddress,
                        }
                    )
                })
            }
        }

    ,
    selectArea: function () {
        this.setData({
            isShowArea: true
        })
    }
    ,
    confirmArea(area) {
        let flag = area.detail.values;
        let provinceAddress = flag[0].name + flag[1].name + flag[2].name;
        this.setData({
            provinceCityArea: provinceAddress,
            isShowArea: false,
            'address.provinceId': flag[0].code,
            'address.province': flag[0].name,
            'address.cityId': flag[1].code,
            'address.city': flag[1].name,
            'address.areaId': flag[2].code,
            'address.area': flag[2].name,
        });
    }
    ,
    cancelArea() {
        this.setData({
            isShowArea: false
        })
    }
    ,
    /*选择社区*/
    selectCommunity: function () {
        netUtils.get(apis.community_list).then((response) => {
            let communityList = response.data.map(function (item) {
                return {
                    name: item.communityName,
                    communityId: item.communityId,
                    communityName: item.communityName,
                }
            });
            this.setData({
                addressList: communityList,
                dialogShow: true
            });
        })
    }
    ,
    /**
     * 0 是选择社区 1 是选择楼宇  2  选择层数 3 是选择 4户数
     * @param event
     */
    onSelectAddress: function (event) {
        this.setData({
            dialogShow: false,
            'address.communityId': event.detail.communityId,
            'address.communityName': event.detail.communityName,
        });
    }
    ,
    onCloseSelectAddress() {
        this.setData({
            dialogShow: false,
        });
    }
    ,
    onChangeDefaultAddress() {
        this.setData({
            'address.isDefault': !this.data.address.isDefault
        });
    },
    /*改变名字*/
    onChangeUserName(event) {
        this.setData(
            {
                'address.userName': event.detail,
            }
        )
    },
    /*改变手机号*/
    onChangePhoneNumber(event) {
        this.setData(
            {
                'address.phoneNumber': event.detail,
            }
        )
    },
    /*改变手机号*/
    onChangeDefineAddress(event) {
        this.setData(
            {
                'address.defineAddress': event.detail,
            }
        )
    },
    submitAddress() {
        if (stringUtils.judgeNull(this.data.address.userName)) {
            //  toast.fail('姓名不能为空');
            return
        }
        if (stringUtils.judgeNull(this.data.address.phoneNumber)) {
            // toast.fail('姓名不能为空');
            return
        }
        if (stringUtils.judgeNull(this.data.address.province)) {
            // toast.fail('姓名不能为空');
            return
        }
        if (stringUtils.judgeNull(this.data.address.defineAddress)) {
            // toast.fail('姓名不能为空');
            return
        }

        if(this.data.type===1){
            netUtils.post(apis.address_update, this.data.address).then((response) => {
                wx.navigateBack();
            });
        }else{
            netUtils.post(apis.address_add, this.data.address).then((response) => {
                wx.navigateBack();
            });
        }


    }
    ,
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    }
    ,

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    }
    ,

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    }
    ,

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    }
    ,

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    }
    ,

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    }
    ,

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})