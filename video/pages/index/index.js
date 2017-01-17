// pages/index/index.js
Page({
  data:{ },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  showVideo: function(e) {
    var url = e.currentTarget.dataset.url;
    url = escape(url);
    console.log(url);
    //console.log(e);
    wx.navigateTo({
      url: '/pages/video/index?url='+url
    })
  },
  EventHandle: function(e) {
    console.log(e);
  }
})