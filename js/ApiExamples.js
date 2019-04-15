//微信小游戏  API 测试
export class ApiExamples{

  /**
   * 获取用户信息
   */
  getUserInfo(){
    let button = wx.createUserInfoButton({
      type: 'text',
      text: '获取用户信息',
      style: {
        left: 10,
        top: 76,
        width: 150,
        height: 40,
        lineHeight: 40,
        backgroundColor: '#ff0000',
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 16,
        borderRadius: 10
      }
    });
    button.onTap(function (res){
      console.log(res);
    });
  }

/**调用接口获取登录凭证（code）*/
  userLogin(){
    wx.login({
      success(res) {
        if (res.code) {
          console.log("登录成功.",res);
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  }

/**获取用户的当前设置。返回值中只会出现小程序已经向用户请求过的权限
 * success 方法中 res的属性authSetting其实是一个 JSON
 */
  getUserSetting(){
    wx.getSetting({
      success:function(res) {
        console.log(JSON.stringify(res.authSetting));
        console.log(res.authSetting["scope.userInfo"]);//属性不存在时，返回 undefined
      }
    });
  }

getRequestTest(){
  wx.request({
    url: 'https://192.168.1.20:8080/coco/getTest',
    data:{
      id:"9527",
      "userName":"华安"
    },
    success:function(res){
      console.log(res.data);
      console.log(res.statusCode);
      console.log(res.header);
    }
  })
}


}