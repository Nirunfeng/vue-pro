// config.js

const config = {
    development: {
        baseURL: 'http://localhost:7120/service-user'  // 开发环境
    },
    production: {
        baseURL: 'http://api.example.com'  // 生产环境
    }
};

// 根据当前环境返回对应的配置
export default config[process.env.NODE_ENV];
