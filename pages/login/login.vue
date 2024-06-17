<template>
	<view class="login">
		<view class="content">
			<!-- 头部logo -->
			<view class="loginHeader">
				<!-- <image :src="logoImage"></image> -->
			</view>
			<!-- 主体表单 -->
			<view class="main">
				<wInput v-model="username" type="text" maxlength="20" placeholder="邮箱" :focus="isFocus" prop="username">
				</wInput>
				<wInput v-model="password" type="password" maxlength="16" placeholder="密码" prop="password"></wInput>
			</view>
			<wButton class="wbutton" text="登 录" :rotate="isRotate" @click="startLogin"></wButton>

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
	//引入api
	import {
		login
	} from '../../request/api.js'

	export default {
		data() {
			return {
				picPath: [
					"../../static/image/avatar/头像1.png",
					"../../static/image/avatar/头像2.png"
				],
				//logo图片
				logoImage: '',
				username: '', //邮箱
				password: '', //密码
				isRotate: false, //是否加载旋转
				isFocus: true // 是否聚焦
			};
		},
		components: {
			wInput,
			wButton,
		},
		onLoad:function(option){
			this.username=option.username
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
      //校验邮箱
      checkEmail(email){
        const reg=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!reg.test(email)){
          return "邮箱格式不正确"
        }
        return null
      },
			//校验username
			checkUsername(username) {
				const reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
				if (this.username.length == "") {
					return "手机号不能为空"
				} else if (!reg.test(username)) {
					return "请输入正确格式的手机号"
				} else {
					return null
				}
			},
			//校验密码
			checkPassword(password) {
				const reg = /(?![A-Z]*$)(?![a-z]*$)(?![0-9]*$)(?![^a-zA-Z0-9]*$)/
				if (password.length < 8 || password.length > 16) {
					return "密码不能少于8位"
				} else if (!reg.test(password)) {
					return "密码必须由大写字母、小写字母、数字、特殊符号中的2种及以上类型组成"
				} else {
					return null
				}
			},
			startLogin(e) {
				console.log(e)
				//登录
				if (this.isRotate) {
					//判断是否加载中，避免重复点击请求
					return false;
				}
				//校验手机号
				let usernameCheckResult = this.checkEmail(this.username)
				if (null != usernameCheckResult) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: usernameCheckResult
					});
					return;
				}
				//校验密码
				let pwdCheckResult = this.checkPassword(this.password)
				if (null != pwdCheckResult) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: pwdCheckResult
					});
					return;
				}
				let loginParam = {
					"username": this.username,
					"password": this.password
				}
				/*调用登录方法*/
				login(loginParam).then((res) => {
					if(res.code=="0"){
						_this.isRotate = true
						setTimeout(function() {
							_this.isRotate = false
						}, 3000)
					}else{
						console.error('失败', res);
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: res.msg
						});
						return;
					}
				}).catch((err) => {
					console.error('失败', err);
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: "网络异常，请重试"
					});
					return;
				});
        //TODO:需要跳转到首页

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