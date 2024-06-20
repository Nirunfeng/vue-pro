<script>
import Vue from 'vue'

export default {
  created() {
    // #ifdef APP-PLUS
    //关闭程序启动界面
    plus.navigator.closeSplashscreen();
    // #endif
  },
  //生命周期函数，应用启动执行一次
  onLaunch: function() {

    console.log('App Launch')
    //适配环境
    uni.getSystemInfo({
      success: function(e) {
        // #ifndef MP
        Vue.prototype.StatusBar = e.statusBarHeight;
        if (e.platform == 'android') {
          Vue.prototype.CustomBar = e.statusBarHeight + 50;
        } else {
          Vue.prototype.CustomBar = e.statusBarHeight + 45;
        };
        // #endif

        // #ifdef MP-WEIXIN
        Vue.prototype.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        Vue.prototype.Custom = custom;
        Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
        // #endif

        // #ifdef MP-ALIPAY
        Vue.prototype.StatusBar = e.statusBarHeight;
        Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
        // #endif
      }
    })
  },
  onShow: function() {
    console.log('App 开启')
  },
  onHide: function() {
    console.log('App 关闭')
  }
}
</script lang="scss">
	/*每个页面公共css */
	@import "/static/css/iconfont/font.css";
<style >

body{
  background: #FFFFFF !important;
}

</style>
