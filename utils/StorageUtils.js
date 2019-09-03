module.exports = {
    setUserId(userId) {
        wx.setStorageSync("userId", userId)
    },
    getUserId() {
        return wx.getStorageSync("userId")
    },
    setToken(token) {
        wx.setStorageSync("token", token)
    },
    getToken() {
        return wx.getStorageSync("token")
    },
}