var utils = require("../../utils/util.js")
//index.js
//获取应用实例
const app = getApp()

//用户登陆
function userLogin() {
  wx.checkSession({
    success: function () {
      //存在登陆态
    },
    fail: function () {
      //不存在登陆态
      onLogin()
    }
  })
}
const weburl = "http://digitaltmc-digitaltmc1.7e14.starter-us-west-2.openshiftapps.com/digitaltmc/";

function onLogin() {
  wx.login({
    success: function (res) {
      if (res.code) {
        //发起网络请求
        wx.request({
          url: weburl + "auth",
          data: {
            code: res.code
          },
          success: function (res) {
            const self = this
            //console.log(res);
            if (res.data) {
              //获取到用户凭证 存儲 3rd_session 
              //var json = JSON.parse(res.data.Data)
              wx.setStorage({
                key: "third_Session",
                data: res.data
                //data: json.third_Session
              })
              //getUserInfo()
            }
            else {

            }
          },
          fail: function (res) {

          }
        })
      }
    },
    fail: function (res) {

    }
  })

}

Page({
  data: {
    motto: 'Hello World',
    role_data: ["TMD", "TTM", "TTIE"],
    userInfo: {},
    hasUserInfo: false,
    test: "test",
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    app.getBookingInfo;
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  navtotable: function(e){
    wx.navigateTo({
      url: '../booker/booker'
    })
  },
  handleUserInfo(e) {
    console.log("aaa");
    onLogin();
    // let msg = e.detail.errMsg;
    // if (msg === 'getUserInfo:ok') {
    //   let user = e.detail.userInfo;
    //   user.encryptedData = e.detail.encryptedData;
    //   user.iv = e.detail.iv;
    //   utils.setDataBase('islogin', true);//set 本地数据
    //   utils.login(user, this.handleLogin.bind(this))
    //   this.setData({
    //     islogin: false
    //   });
    // } else {
    //   utils.setDataBase('islogin', false);//set 本地数据
    //   this.setData({
    //     islogin: true
    //   });
    //   utils.showModal('五色糖，申请获得您的公开信息（头像，昵称等）。授权后，您能体验到我们更完善的功能，谢谢您关注五色糖。', false, this);
    // }
  }
})
