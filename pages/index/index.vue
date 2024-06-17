<template>
	<view>
		<!--底部导航-->
		<view class="footer" >
			<helang-tab-bar-bubble :fixed-bottom="false"></helang-tab-bar-bubble>
		</view>
	</view>
</template>

<script>
	//固定组件
	import tabBarBubble from "@/uni_modules/helang-tabBar/components/helang-tabBar/tab-bar-bubble.vue";
	
	//工具函数
	import _tool from '../../static/js/tools.js';
	export default {
		components: { 
			"helang-tab-bar-bubble":tabBarBubble, 
		},
		data() {
			return {
				
			}
		},
		onLoad() {
			
		},
		onReady() {
		},
		methods: {
		}
	}
</script>

<style scoped>
	.footer{
		position: fixed;
		bottom: 0;
		width: 100%;
		border:red 1px solid;
	}
</style>
