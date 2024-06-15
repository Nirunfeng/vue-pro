import config from './config.js';

// 请求超出时间
const timeout = 5000

//封装通用post/get请求
const request = (options) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: config.baseURL + options.url, // 拼接基础URL和具体接口路径
			method: options.method || 'GET', // 默认GET请求
			data: options.data || {},
			header: options.header || {
				'Content-Type': 'application/json'
			},
			timeout: timeout,
			success: (res) => {
				if (res.statusCode === 200) {
					resolve(res.data);
				} else {
					reject(res);
				}
			},
			fail: (err) => {
				reject(err);
			}
		});
	});
};

export default request;