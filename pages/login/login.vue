<template>
  <view class="login">
    <view class="content">
      <!-- 头部logo -->
      <view class="header">
        <image :src="logoImage"></image>
      </view>
      <!-- 主体表单 -->
      <view class="main" :rules="searchRule">
        <wInput
            v-model="username"
            type="text"
            maxlength="11"
            placeholder="用户名/电话"
            :focus="isFocus"
            prop="username"
        ></wInput>
        <wInput
            v-model="password"
            type="password"
            maxlength="16"
            placeholder="密码"
            prop="password"
        ></wInput>
      </view>
      <wButton
          class="wbutton"
          text="登 录"
          :rotate="isRotate"
          @click="startLogin"
      ></wButton>

      <!-- 其他登录 -->
      <!--      <view class="other_login cuIcon">-->
      <!--        <view class="login_icon">-->
      <!--          <view class="cuIcon-weixin" @tap="login_weixin"></view>-->
      <!--        </view>-->
      <!--        <view class="login_icon">-->
      <!--          <view class="cuIcon-weibo" @tap="login_weibo"></view>-->
      <!--        </view>-->
      <!--        <view class="login_icon">-->
      <!--          <view class="cuIcon-github" @tap="login_github"></view>-->
      <!--        </view>-->
      <!--      </view>-->

      <!-- 底部信息 -->
      <view class="footer">
        <navigator url="forget" open-type="navigate">找回密码</navigator>
        <text>|</text>
        <navigator url="register" open-type="navigate">注册账号</navigator>
      </view>
    </view>
  </view>
</template>

<script>
let _this;
import wInput from '../../components/watch-login/watch-input.vue' //input
import wButton from '../../components/watch-login/watch-button.vue' //button

export default {
  data() {
    return {
      picPath: [
        "../../static/image/avatar/头像1.png",
        "../../static/image/avatar/头像2.png"
      ],
      //logo图片
      logoImage: '',
      username: '', //用户/电话
      password: '', //密码
      isRotate: false, //是否加载旋转
      isFocus: true, // 是否聚焦
      searchRule: {
        //校验规则,手机号
        username: [
          {
            required: true,
            message: "请输入手机号码",
            trigger: "blur"
          },
          {
            validator: function(rule, value, callback) {
              if (/^1[34578]\d{9}$/.test(value) == false) {
                callback(new Error("手机号格式错误"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        //校验密码规则
        password:[
          { required: true, trigger: "blur", message: "请输入您的密码" },
          {
            min: 8,
            max: 16,
            message: "用户密码长度至少8位",
            trigger: "blur",
          },
          {
            pattern: /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]/,
            message: "密码应包含数字、大小写字母、特殊符号中的3类",
            trigger: "blur",
          }
        ]
      }
    };
  },
  components: {
    wInput,
    wButton,
  },
  //页面创建时生命周期函数
  created() {
    /*随机选取头像*/
    let index = Math.round(Math.random() * (this.picPath.length - 1))
    this.logoImage = this.picPath[index]
  },
  mounted() {
    _this = this;
    //this.isLogin();
  },
  methods: {
    isLogin() {
      //判断缓存中是否登录过，直接登录
      // try {
      // 	const value = uni.getStorageSync('setUserData');
      // 	if (value) {
      // 		//有登录信息
      // 		console.log("已登录用户：",value);
      // 		_this.$store.dispatch("setUserData",value); //存入状态
      // 		uni.reLaunch({
      // 			url: '../../../pages/index',
      // 		});
      // 	}
      // } catch (e) {
      // 	// error
      // }
    },
    startLogin(e) {
      console.log(e)
      //登录
      if (this.isRotate) {
        //判断是否加载中，避免重复点击请求
        return false;
      }
      if (this.phoneData.length == "") {
        uni.showToast({
          icon: 'none',
          position: 'bottom',
          title: '用户名不能为空'
        });
        return;
      }
      if (this.passData.length < 5) {
        uni.showToast({
          icon: 'none',
          position: 'bottom',
          title: '密码不正确'
        });
        return;
      }

      console.log("登录成功")

      _this.isRotate = true
      setTimeout(function () {
        _this.isRotate = false
      }, 3000)
      // uni.showLoading({
      // 	title: '登录中'
      // });
      // getLogin()
      // .then(res => {
      // 	//console.log(res)
      // 	//简单验证下登录（不安全）
      // 	if(_this.phoneData==res.data.username && _this.passData==res.data.password){
      // 		let userdata={
      // 			"username":res.data.username,
      // 			"nickname":res.data.nickname,
      // 			"accesstoken":res.data.accesstoken,
      // 		} //保存用户信息和accesstoken
      // 		_this.$store.dispatch("setUserData",userdata); //存入状态
      // 		try {
      // 			uni.setStorageSync('setUserData', userdata); //存入缓存
      // 		} catch (e) {
      // 			// error
      // 		}
      // 		uni.showToast({
      // 			icon: 'success',
      // 			position: 'bottom',
      // 			title: '登录成功'
      // 		});
      // 		uni.reLaunch({
      // 			url: '../../../pages/index',
      // 		});
      // 	}else{
      // 		_this.passData=""
      // 		uni.showToast({
      // 			icon: 'error',
      // 			position: 'bottom',
      // 			title: '账号或密码错误，账号admin密码admin'
      // 		});
      // 	}
      // 	uni.hideLoading();
      // }).catch(err => {
      // 	uni.hideLoading();
      // })

    },
    login_weixin() {
      //微信登录
      uni.showToast({
        icon: 'none',
        position: 'bottom',
        title: '...'
      });
    },
    login_weibo() {
      //微博登录
      uni.showToast({
        icon: 'none',
        position: 'bottom',
        title: '...'
      });
    },
    login_github() {
      //github登录
      uni.showToast({
        icon: 'none',
        position: 'bottom',
        title: '...'
      });
    }
  }
}
</script>

<style>
@import url("../../components/watch-login/css/icon.css");
@import url("../../static/css/login/main.css");
</style>
