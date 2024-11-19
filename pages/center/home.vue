<template>
	<view class="orane-content">
		<view class="orane-usertop">
			<view class="statusbar" :style="'height:'+statusbarheight"></view>
			<!-- #ifndef H5 -->
			<view class="topfix"></view>
			<!-- #endif -->
			<view v-if="userInfo.avatar" class="userline1" @tap="toUrl()">
				<image :src="userInfo.avatar" class="userimg"></image>
				<view class="username">
					<text class="name">{{userInfo.nickname}}</text>
				</view>
			</view>
			<view v-else class="userline1" @tap="toLogin()">
				<image :src="avatar" class="userimg"></image>
				<text class="name">登录/注册</text>

			</view>
			<view class="userline3"><text class="signttx">{{userInfo.bio}}</text></view>
		</view>
		<view class="orane-usermenus">
			<view class="micon" @tap="toUrl()">
				<text class="new" v-if="userInfo.newnotice>0"></text>
				<image src="../../static/image/user/notice.webp" class="mimg"></image>
				<text class="txt">消息</text>
			</view>
			<view class="micon" @tap="toUrl()">
				<image src="../../static/image/user/history.webp" class="mimg"></image>
				<text class="txt">浏览历史</text>
			</view>
			<view class="micon" @tap="toUrl()">
				<image src="../../static/image/user/order.webp" class="mimg"></image>
				<text class="txt">我的订单</text>
			</view>
			<view class="micon" @tap="toUrl()">
				<image src="../../static/image/user/set.webp" class="mimg"></image>
				<text class="txt">设置</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				avatar:'../../static/image/user/avatar.jpg',
				statusbarheight: '',
				userInfo: {},

			}
		},
		onLoad() {
			//获取状态栏高度
			this.statusbarheight = uni.getStorageSync('statusBarHeight') + 'px'
			this.getProfile()
			this.isLogin()
		},
		onPullDownRefresh() {
			this.getProfile()
		},
		methods: {
			isLogin() {
				//判断缓存中是否登录过， 直接登录
				try {
					const value = uni.getStorageSync('setUserData');
					if (value) {
						//有登录信息
						console.log("已登录用户：", value);
						this.userInfo = JSON.parse(value);
						_this.$store.dispatch("setUserData", value); //存入状态
					}
					console.log("userInfo为", this.userInfo)
				} catch (e) {
					// error
				}
			},
			//登录/注册页面
			toLogin(){
				uni.navigateTo({
					url: '/pages/login/login'
				});
			},
			//页面跳转
			toUrl(link) {
				uni.showToast({
					title: '自行控制跳转页面',
					icon: 'none'
				})
			},
			//初始化数据
			getProfile() {
				setTimeout(() => {
					uni.stopPullDownRefresh();
				}, 200)
			},
		}
	}
</script>

<style scoped>
	page {
		background-color: #fff;
	}

	.statusbar {
		width: 750rpx;
	}

	.orane-usertop {
		width: 750rpx;
		background-color: #ff5e5e;
		display: flex;
		flex-direction: column;
		padding: 50rpx 0 20rpx 0;
	}

	.orane-usertop .topfix {
		height: 100rpx;
	}

	.orane-usertop .userline1 {
		flex-direction: row;
		align-items: center;
		padding: 0 30rpx;
		display: flex;
		margin-bottom: 40rpx;
	}

	.orane-usertop .userline1 .userimg {
		width: 120rpx;
		height: 120rpx;
		border-radius: 100rpx;
		border: 4rpx solid #fff;
		margin-right: 20rpx;
	}

	.orane-usertop .userline1 .username {
		display: flex;
		flex-direction: column;
		width: 550rpx;
	}

	.orane-usertop .userline1 .username .name {
		color: #fff;
		font-size: 36rpx;
		margin-bottom: 6rpx;
		font-weight: 600;
	}

	.orane-usertop .userline1 .username .info {
		flex-direction: row;
	}

	.orane-usertop .userline1 .username .info .itxt {
		font-size: 28rpx;
		color: #fff;
		margin-right: 20rpx;
	}

	.orane-usertop .userline2 {
		flex-direction: row;
		align-items: center;
		display: flex;
		padding: 0 30rpx;
		margin-bottom: 40rpx;
	}

	.orane-usertop .userline2 .tags {
		margin-right: 12rpx;
		flex-direction: row;
		align-items: center;
		background-color: rgba(0, 0, 0, .2);
		border-radius: 5rpx;
		padding: 6rpx 20rpx;
		display: flex;
		font-size: 28rpx;
	}

	.orane-usertop .userline2 .tags .tagimg {
		width: 26rpx;
		height: 26rpx;
		margin-right: 2rpx;
	}

	.orane-usertop .userline2 .tags .tagtxt {
		color: #1296db;
		font-size: 26rpx;
	}

	.orane-usertop .userline2 .tags .tagtxt.nv {
		color: #d4237a;
		font-size: 26rpx;
	}

	.orane-usertop .userline2 .tagother {
		margin-right: 12rpx;
		font-size: 28rpx;
		color: #fff;
		background-color: rgba(0, 0, 0, .2);
		border-radius: 6rpx;
		padding: 0 18rpx;
		height: 46rpx;
		display: flex;
		align-items: center;
	}

	.orane-usertop .userline3 {
		display: flex;
		align-items: center;
		padding: 0 30rpx;
		margin-bottom: 30rpx;
	}

	.orane-usertop .userline3 .signttx {
		flex-direction: row;
		align-items: center;
		font-size: 28rpx;
		color: #fff;
	}

	.orane-usermenus {
		padding: 30rpx 0;
		justify-content: center;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
		display: flex;
	}

	.orane-usermenus .micon {
		width: 180rpx;
		justify-content: center;
		align-items: center;
		margin: 36rpx 0;
		position: relative;
		display: flex;
		flex-direction: column;
	}

	.orane-usermenus .micon .new {
		position: absolute;
		width: 16rpx;
		height: 16rpx;
		border-radius: 16rpx;
		background-color: #f30;
		right: 60rpx;
		top: 0;
	}

	.orane-usermenus .micon .mimg {
		width: 50rpx;
		height: 50rpx;
		margin-bottom: 16rpx;
	}

	.orane-usermenus .micon .txt {
		font-size: 28rpx;
	}
</style>