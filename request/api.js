// 引入 request 文件
import request from './index.js'

/*用户相关接口*/
//用户登录
export const login=(params)=>{
    return request({
        url:'/user/login.do',
        method:'post',
        data:params
    })
}
//用户注册
export const register=(params)=>{
	return request({
	    url:'/user/register.do',
	    method:'post',
	    data:params
	})
}
//用户重置密码
export const resetPassword=(params)=>{
	return request({
	    url:'/user/update.do',
	    method:'post',
	    data:params
	})
}