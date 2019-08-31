// pages/address/add/add.js
import areaList from '../../../common/area'

const apis = require("../../../utils/apis");
const netUtils = require("../../../utils/netUtils");
Page({
    components: {areaList},

    /**
     * 页面的初始数据
     */
    data: {
        address: {
            userName: "",
            province: "",
            provinceId: "",
            cityId: "",
            city: "",
            areaId: "",
            area: "",
            communityId: 0,
            community: "",
            userAddress: "",
            isDefault: 0,
            phoneNumber: "",
            defineAddress: ""
        },
        isDefault: false,
        isShowArea: false,
        areaList: null,
        dialogShow: false,
        addressList: [],
        communityList: [],
        buildNumbers: [],
        floorNumber: [],
        unitNumber: [],
        userNumber: [],
        provinceCityArea: "",
        communityName: "",
        buildName: "",
        unitName: "",
        floorName: "",
        owerName: "",
        selectType: 0//选择类型 0 是选择社区 1 是选择楼宇  2  选择层数 3 是选择 户数
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            areaList: areaList
        });
        netUtils.get(apis.community_list).then((response) => {
            let data = response.data;

            let communityList = response.data.map(function (item) {
                return {
                    name: item.communityName,
                    communityId: item.communityId,
                    communityName: item.communityName,
                    buildNumberList: item.buildNumbers
                }
            });
            this.setData({
                addressList: communityList
            });
        })
    },
    selectArea: function () {
        this.setData({
            isShowArea: true
        })
    },
    confirmArea(area) {
        let flag = area.detail.values;
        let provinceAddress = flag[0].name + flag[1].name + flag[2].name;
        this.setData({
            provinceCityArea: provinceAddress,
            isShowArea: false,
            provinceId: flag[0].code,
            province: flag[0].name,
            cityId: flag[1].code,
            city: flag[1].name,
            areaId: flag[2].code,
            area: flag[2].name,
        });
    },
    cancelArea() {
        this.setData({
            isShowArea: false
        })
    },
    /*选择社区*/
    selectCommunity: function () {
        this.setData(
            {
                dialogShow: true
            }
        )
    },
    /**
     * 选择楼宇
     */
    selectBuildNumber: function () {
        if (this.data.buildNumbers === undefined) {
            return
        }
        this.setData({
            selectType: 1,
            dialogShow: true,
            addressList: this.data.buildNumbers
        })
    },
    /**
     * 选择单元
     */
    selectUnit: function () {
        if (this.data.unitNumber === undefined) {
            return
        }
        this.setData({
            selectType: 2,
            dialogShow: true,
            addressList: this.data.unitNumber
        })
    },
    /**
     * 选择楼层
     */
    selectFloor: function () {
        if (this.data.unitNumber === undefined) {
            return
        }
        this.setData({
            selectType: 3,
            dialogShow: true,
            addressList: this.data.floorNumber
        })
    },
    /**
     * 选择楼层
     */
    selectUserNumber: function () {
        if (this.data.userNumber === undefined) {
            return
        }
        this.setData({
            selectType: 4,
            dialogShow: true,
            addressList: this.data.userNumber
        })
    },

    /**
     * 0 是选择社区 1 是选择楼宇  2  选择层数 3 是选择 4户数
     * @param event
     */
    onSelectAddress: function (event) {

        if (this.data.selectType === 0) {
            let buildList = event.detail.buildNumberList.map(item => {
                return {
                    name: item.buildName,
                    buildNumber: item
                }
            });
            this.setData({
                dialogShow: false,
                unitNumber: "",
                buildNumbers: buildList,
                communityName: event.detail.communityName,
                address: {
                    communityId: event.detail.communityId,
                    communityName: event.detail.communityName,
                }
            });
        } else if (this.data.selectType === 1) {
            let startUnit = event.detail.buildNumber.startUnit;
            let endUnit = event.detail.buildNumber.endUnit;
            let startFloor = event.detail.buildNumber.startFloor;
            let endFloor = event.detail.buildNumber.endFloor;
            let startNumber = event.detail.buildNumber.startNumber;
            let endNumber = event.detail.buildNumber.endNumber;
            let unitList = this.createArray(startUnit, endUnit);
            let floorList = this.createArray(startFloor, endFloor);
            let userList = this.createArray(startNumber, endNumber);
            this.setData({
                dialogShow: false,
                buildName: event.detail.name,
                unitNumber: unitList,
                floorNumber: floorList,
                userNumber: userList
            })
        } else if (this.data.selectType === 2) {
            this.setData({
                unitName: event.detail.name,
                dialogShow: false,
            })
        } else if (this.data.selectType === 3) {
            let floorName = event.detail.value;
            if (event.detail.value < 10) {
                floorName = "0" + event.detail.value
            }
            this.setData({
                floorName: floorName,
                dialogShow: false,
            })
        } else if (this.data.selectType === 4) {
            let owerName = event.detail.value;
            if (event.detail.value < 10) {
                owerName = "0" + event.detail.value
            }
            this.setData({
                owerName: owerName,
                dialogShow: false,
            })
        }
        let addressName = this.data.buildName + "-" + this.data.unitName + "-" + this.data.floorName + this.data.owerName;
        if (addressName !== undefined && addressName !== "") {
            this.setData({
                address: {
                    userAddress: addressName,
                }
            })
        }

    },

    createArray(startNumber, endNumber) {
        let objectList = [];
        for (let i = startNumber; i <= endNumber; i++) {
            objectList.push({
                name: i,
                value: i
            })
        }
        return objectList;
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