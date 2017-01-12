var util = require("../../utils/util.js");
Page({
  data:{
    q:'', //
    content:[]
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    //console.log(util.formatTime(new Date()));
    this.loadContent();
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
    
  },
  onShow:function(){
    // 生命周期函数--监听页面显示
    
  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
    
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
    
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
    
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
    
  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  }, 

  inputEvent: function(event) {
      var value = event.detail.value;
      this.setData({q:value});
  },

  queryAnswer: function() {
      var page = this;
      var q = this.data.q;
      if(q==null || q==='') {
          wx.showToast({
              title: '请输入您的问题',
              icon: 'loading'
          });
      } else {
        var appkey = "147c3451003239dcb1ac1dda32660d4e";

        var datas = page.data.content;
        datas.push({"isRobot":false, "date": util.formatTime(new Date()), "text":q});

        page.setData({q:'', content:datas});

        var url = "http://op.juhe.cn/robot/index?key="+appkey+"&info="+q;
        wx.request({
          url: url,
          data: {},
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: function(res){
            // success
            if(res.data.error_code=='0') {
                var con = res.data.result.text;
                var datas = page.data.content;
                datas.push({"isRobot":true, "date": util.formatTime(new Date()), "text":con});

                console.log(datas);
                page.setData({content:datas});

                page.setContent2Storage(datas);
            } else {
                wx.showToast({
                    title:res.data.reason, icon:'loading'
                });
            }
            console.log(res);
          }
        })
      }
  },

  setContent2Storage: function(data) {
    wx.setStorage({
      key: 'content',
      data: data,
      success: function(res){
        // success
        //console.log("=====保存成功=====");
      }
    })
  },

  loadContent: function() {
    var page = this;
    wx.getStorage({
      key: 'content',
      success: function(res){
        // success
        console.log(res);
        page.setData({content:res.data});
      }
    })
  }
})