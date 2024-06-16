<template>
	<view class="register">

		<view class="content">
			<!-- 头部logo -->
			<view class="header" @click="chooseAvatar">
				<image :src="logoImage"></image>
			</view>
			<!-- 主体 -->
			<view class="main">
				<wInput v-model="username" type="text" maxlength="11" placeholder="手机号"></wInput>
				<wInput v-model="password" type="password" maxlength="11" placeholder="登录密码" isShowPass></wInput>
				<wInput v-model="email" type="text" maxlength="20" placeholder="邮箱"></wInput>
				<wInput v-model="verCode" type="number" maxlength="6" placeholder="验证码" isShowCode ref="runCode"
					@setCode="getVerCode()"></wInput>

			</view>

			<wButton class="wbutton" text="注 册" :rotate="isRotate" @click.native="startReg()"></wButton>

			<!-- 底部信息 -->
			<view class="footer">
				<text @tap="isShowAgree" class="cuIcon" :class="showAgree?'cuIcon-radiobox':'cuIcon-round'"> 同意
				</text>
				<!-- 协议地址 -->
				<navigator url="" open-type="navigate">《协议》</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	let _this;
	import wInput from '../../components/watch-login/watch-input.vue' //input
	import wButton from '../../components/watch-login/watch-button.vue' //button
	import config from '../../request/config.js';
	import {
		register,
		verifyCode
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
				username: '',
				password: '',
				email: '',
				verCode: "", //验证码
				showAgree: true, //协议是否选择
				isRotate: false, //是否加载旋转
			}
		},
		components: {
			wInput,
			wButton,
		},
		created() {
			/*随机选取头像*/
			let index = Math.round(Math.random() * (this.picPath.length - 1))
			this.logoImage = this.picPath[index]
			//上传图片
			uni.uploadFile({
				url: config.baseURL + '/user/avatarUpload.do', //仅为示例，非真实的接口地址
				filePath: this.logoImage,
				name: 'file',
				success: (res) => {
					const data = JSON.parse(res.data);
					if (data.code == "0") {
						this.logoImage = data.data
					}
				}
			});
		},
		mounted() {
			_this = this;
		},
		methods: {
			//选择图片
			chooseAvatar() {
				uni.chooseImage({
					count: 1, // 只允许选择一张图片
					sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
					success: (res) => {
						const tempFilePaths = res.tempFilePaths;
						this.logoImage = tempFilePaths[0];
						//上传图片
						uni.uploadFile({
							url: config.baseURL + '/user/avatarUpload.do', //仅为示例，非真实的接口地址
							filePath: this.logoImage,
							name: 'file',
							success: (res) => {
								console.log(res.data);
								if (res.code == "0") {
									this.logoImage = res.data.data
								}
							}
						});
					}
				});
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
			//校验邮箱
			checkEmail(email){
				const reg=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
				if(!reg.test(email)){
					return "邮箱格式不正确"
				}
				return null
			},
			isShowAgree() {
				//是否选择协议
				_this.showAgree = !_this.showAgree;
			},
			getVerCode() {
				const emailCheckResult=this.checkEmail(this.email)
				if(emailCheckResult!=null){
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: emailCheckResult
					});
					return;
				}
				console.log("获取验证码")
				const params={
					"email":this.email
				}
				verifyCode(params).then((res)=>{
					if(res.code=="0"){
						this.$refs.runCode.$emit('runCode'); //触发倒计时（一般用于请求成功验证码后调用）
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: '获取验证码成功'
						});
					}
				}).catch((err)=>{
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: "网络异常，验证码获取失败"
					});
				})
			},


			startReg() {
				//注册
				if (this.isRotate) {
					//判断是否加载中，避免重复点击请求
					return false;
				}
				if (this.showAgree == false) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '请先同意《协议》'
					});
					return false;
				}
				//校验手机号
				let usernameCheckResult = this.checkUsername(this.username)
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
				//调用注册方法
				let registerParam = {
					"username": this.username,
					"password": this.password,
					"imgUrl": this.logoImage
				}
				register(registerParam).then((res) => {
					if (res.code == "0") {
						//注册成功
						console.log("注册成功")
						/*注册成功跳转页面*/
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							duration: 2000,
							title: '注册成功，即将跳转登录页面'
						});
						_this.isRotate = true
						setTimeout(function() {
							_this.isRotate = false
							uni.navigateTo({
								url: 'login'
							});
						}, 2000)
						console.log(_this.isRotate)
					} else {
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
						title: err.data
					})
				})
			}
		}
	}
</script>

<style>
	@import url("../../components/watch-login/css/icon.css");
	@import url("../../static/css/login/main.css");
</style>