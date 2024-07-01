// 引入 request 文件
import request from './index.js'

/*用户相关接口*/
//用户登录
export const login = (params) => {
	return request({
		url: '/user/login.do',
		method: 'post',
		data: params,
		module:'user'
	})
}
//用户注册
export const register = (params) => {
	return request({
		url: '/user/register.do',
		method: 'post',
		data: params,
		module:'user'
	})
}
//用户重置密码
export const resetPassword = (params) => {
	return request({
		url: '/user/update.do',
		method: 'post',
		data: params,
		module:'user'
	})
}

//获取验证码
export const verifyCode=(params)=>{
	return request({
		url:'/user/sendVerCodeMail.do',
		method:'get',
		data:params,
		module:'user'
	})
}

//加载学校字典
export const schoolList=(params)=>{
	return request({
		url:'/dictionary/querySchoolDictionary.do',
		method:'get',
		data:params,
		module:'dictionary'
	})
}
//根据名称查询学校
export const searchSchool=(params)=>{
	return request({
		url:'/dictionary/querySchoolDictByName.do',
		method:'get',
		data:params,
		module:'dictionary'
	})
}

//查询app菜单
export const appMenu=()=>{
	return request({
		url:'/client/menu/queryMenus.do',
		method:'get',
		module:'dictionary'
	})
}