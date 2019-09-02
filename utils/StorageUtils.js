module.exports = {
    setUserId(userId) {
        wx.setStorage({
            key: "userId",
            data: userId
        })
    },
    getUserId() {
        return new Promise((resolve, reject) => {
            wx.getStorage({
                key: 'userId',
                success(res) {
                    resolve(res.data)
                }
            })
        })

    }

}