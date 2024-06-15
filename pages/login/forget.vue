<template>
	<view class="forget">
		
		<view class="content">
			<!-- 主体 -->
			<view class="main">
				<view class="tips">若你忘记了密码，可在此重置新密码。</view>
				<wInput
					v-model="username"
					type="text"
					maxlength="11"
					placeholder="请输入手机号码"
				></wInput>
				<wInput
					v-model="password"
					type="password"
					maxlength="11"
					placeholder="请输入新密码"
					isShowPass
				></wInput>
				
				<wInput
					v-model="verCode"
					type="number"
					maxlength="4"
					placeholder="验证码"
					
					isShowCode
					codeText="获取重置码"
					setTime="30"
					ref="runCode"
					@setCode="getVerCode()"
				></wInput>
			</view>
			
			<wButton 
				class="wbutton"
				text="重置密码"
				:rotate="isRotate" 
				@click.native="startRePass()"
			></wButton>

		</view>
	</view>
</template>

<script>
	let _this;
	import wInput from '../../components/watch-login/watch-input.vue' //input
	import wButton from '../../components/watch-login/watch-button.vue' //button
	import { resetPassword } from '../../request/api';
	export default {
		data() {
			return {
				username: "", //电话
				password: "", //密码
				verCode:"", //验证码
				isRotate: false, //是否加载旋转
			}
		},
		components:{
			wInput,
			wButton
		},
		mounted() {
			_this= this;
		},
		methods: {
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
			getVerCode(){
				//获取验证码
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
				console.log("获取验证码")
				this.$refs.runCode.$emit('runCode'); //触发倒计时（一般用于请求成功验证码后调用）
				uni.showToast({
				    icon: 'none',
					position: 'bottom',
				    title: '模拟倒计时触发'
				});
				
				setTimeout(function(){
					_this.$refs.runCode.$emit('runCode',0); //假装模拟下需要 终止倒计时
					uni.showToast({
					    icon: 'none',
						position: 'bottom',
					    title: '模拟倒计时终止'
					});
				},3000)
			},
			startRePass() {
				//重置密码
				if(this.isRotate){
					//判断是否加载中，避免重复点击请求
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
				// if (this.verCode.length != 4) {
				//     uni.showToast({
				//         icon: 'none',
				// 		position: 'bottom',
				//         title: '验证码不正确'
				//     });
				//     return false;
				// }
				let resetParam={
					"username":this.username,
					"password":this.password
				}
				resetPassword(resetParam).then((res)=>{
					if(res.code==0){
						console.log("重置成功")
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							duration: 2000,
							title: '重置成功，即将跳转登录页面'
						});
						console.log("重置密码成功")
						_this.isRotate=true
						setTimeout(function(){
							_this.isRotate=false
							uni.navigateTo({
								url: 'login'
							});
						},2000)
					} else {
						console.error('失败', res);
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: res.msg
						});
						return;
					}
				}).catch((err)=>{
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

