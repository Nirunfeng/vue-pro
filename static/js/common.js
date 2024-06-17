import {verifyCode} from "../../request/api";

var userMethod={
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
	getVerCode(username) {
		const emailCheckResult=this.checkEmail(this.username)
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
			"email":username
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
	}
}
export default userMethod