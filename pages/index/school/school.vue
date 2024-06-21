<template>
    <view>
        <hao-indexList
         :letters="letters" 
         idValue="areaId" 
         nameValue="areaName" 
         :currentCity="currentCity" 
         :hotCity="hotCity"
         :cityList="cityList">
        </hao-indexList>
    </view>
</template>

<script>
    import haoIndexList from '@/components/hao-indexList/hao-indexList.vue'
    export default {
		components: {hao-indexList:haoIndexList},
        data() {
            return {
                //索引
                letters: ['A', 'B', 'C'], //城市首字母集合
                //当前城市
                currentCity: {
                    "areaId": "430100",
                    "areaName": "长沙市",
                },
                //热门城市
                hotCity: [
                    {
                        "areaId": "110100",
                        "areaName": "北京市",
                    },
                    {
                        "areaId": "310100",
                        "areaName": "上海市",
                    },
                    {
                        "areaId": "440100",
                        "areaName": "广州市",
                    },
                    {
                        "areaId": "440300",
                        "areaName": "深圳市",
                    },
                ],
                //城市列表
                cityList: {
                    "A": [
                        {
                            "areaId": "152900",
                            "areaName": "阿拉善盟",
                        },
                        {
                            "areaId": "210300",
                            "areaName": "鞍山市",
                        },
                    ],
                    "B": [{
                            "areaId": "110100",
                            "areaName": "北京市",
                        },
                        {
                            "areaId": "130600",
                            "areaName": "保定市",
                        },
                    ],
                    "C": [{
                            "areaId": "130800",
                            "areaName": "承德市",
                        },
                        {
                            "areaId": "130900",
                            "areaName": "沧州市",
                        },
                    ]
                }
            }
        }
    }
<script>            

<style scoped>

</style>
