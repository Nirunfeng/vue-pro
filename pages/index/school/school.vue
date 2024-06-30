<template>
    <view>
		<uni-search-bar @input="search" v-model="searchValue" placeholder="请输入关键字查询学校"></uni-search-bar>
		<uni-indexed-list :options="list" @click="bindClick"></uni-indexed-list>
    </view>
</template>

<script>
	import { schoolList,searchSchool} from '../../../request/api';
	export default {
	data() {
		return {
			searchValue:'',
			list: []
		};
	},
	//页面创建时生命周期函数
	created() {
		//调用接口赋值list
		schoolList().then((res)=>{
			//调用成功的返回
			if(res.code=='0'){
				this.list=res.data
			}
		}).catch((err)=>{
			console.error('失败', err);
			uni.showToast({
				icon: 'none',
				position: 'bottom',
				title: "网络异常，请重试"
			});
			return;
		})
	},
	methods: {
    //点击选择对应学校时触发的操作
		bindClick(e) {
      //应该修改对应user的学校代码数据并设置缓存返回到首页
      //TODO:修改数据
	  
	  //存缓存
	  let school=JSON.stringify(e)
	  uni.setStorageSync('school',school)
	  //返回页面
	  uni.switchTab({
	  	url: '/pages/index/index'
	  });
		window.location.reload()	
		},
		search(){
			const params={
				"name":this.searchValue
			}
			//调用接口赋值list
      searchSchool(params).then((res)=>{
				//调用成功的返回
				if(res.code=='0'){
					this.list=res.data
				}
			}).catch((err)=>{
				console.error('失败', err);
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: "网络异常，请重试"
				});
				return;
			})
		}
	}
};
</script>
 
<style></style>
