<template>
    <view>
		<uni-search-bar @input="search" v-model="searchValue" placeholder="请输入关键字查询学校"></uni-search-bar>
		<uni-indexed-list :options="list" @click="bindClick"></uni-indexed-list>
    </view>
</template>

<script>
	import { schoolList } from '../../../request/api';
	export default {
	data() {
		return {
			searchValue:'',
			list: [
				// {
				// 	letter: 'A',
				// 	data: [
				// 		{
				// 			"id":580,
				// 			"code":"10479",
				// 			"name":"安阳师范学院",
				// 			"letter":"A"
				// 		}
				// 	]
				// }
				// {
				// 	letter: 'B',
				// 	data: ['保山机场', '包头机场']
				// },
				// {
				// 	letter: 'C',
				// 	data: ['长白山机场', '长春龙嘉国际机场']
				// },
				// {
				// 	letter: 'D',
				// 	data: ['大理机场', '大连周水子国际机场']
				// },
				// {
				// 	letter: 'E',
				// 	data: ['鄂尔多斯机场', '恩施许家坪机场']
				// },
				// {
				// 	letter: 'F',
				// 	data: ['阜阳西关机场', '福州长乐国际机场']
				// },
				// {
				// 	letter: 'G',
				// 	data: ['赣州黄金机场', '格尔木机场']
				// },
				// {
				// 	letter: 'H',
				// 	data: ['哈尔滨太平国际机场', '哈密机场']
				// },
				// {
				// 	letter: 'I',
				// 	data: []
				// },
				// {
				// 	letter: 'J',
				// 	data: ['济南遥墙国际机场', '济宁曲阜机场']
				// },
				// {
				// 	letter: 'K',
				// 	data: ['喀什机场', '克拉玛依机场']
				// },
				// {
				// 	letter: 'L',
				// 	data: ['拉萨贡嘎机场', '兰州中川机场']
				// },
				// {
				// 	letter: 'M',
				// 	data: ['满洲里西郊机场', '绵阳南郊机场']
				// },
				// {
				// 	letter: 'N',
				// 	data: ['南昌昌北国际机场', '南充高坪机场']
				// },
				// {
				// 	letter: 'O',
				// 	data: []
				// },
				// {
				// 	letter: 'P',
				// 	data: ['普洱思茅机场']
				// },
				// {
				// 	letter: 'Q',
				// 	data: ['齐齐哈尔三家子机场', '秦皇岛山海关机场']
				// },
				// {
				// 	letter: 'R',
				// 	data: ['日喀则和平机场']
				// },
				// {
				// 	letter: 'S',
				// 	data: ['三亚凤凰国际机场', '汕头外砂机场']
				// },
				// {
				// 	letter: 'T',
				// 	data: ['塔城机场', '太原武宿国际机场']
				// },
				// {
				// 	letter: 'U',
				// 	data: []
				// },
				// {
				// 	letter: 'V',
				// 	data: []
				// },
				// {
				// 	letter: 'W',
				// 	data: ['万州五桥机场', '潍坊机场']
				// },
				// {
				// 	letter: 'X',
				// 	data: ['西安咸阳国际机场', '西昌青山机场']
				// },
				// {
				// 	letter: 'Y',
				// 	data: ['延安二十里堡机场', '盐城机场']
				// },
				// {
				// 	letter: 'Z',
				// 	data: ['湛江机场', '昭通机场']
				// }
			]
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
		bindClick(e) {
			uni.showToast({
				title: '点击item，返回数据' + JSON.stringify(e),
				icon: 'none'
			})
		},
		search(){
			const params={
				"name":this.searchValue
			}
			//调用接口赋值list
			schoolList(params).then((res)=>{
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
