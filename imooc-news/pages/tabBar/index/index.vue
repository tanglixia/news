<template>
	<view class="content">
		<navbar></navbar>
		<view>
			<tab :list = "tabList" @tab="tab"></tab>
		</view>
		
	</view>
</template>

<script>
	import navbar from '@/components/navbar/navbar.vue'
	import tab from '@/components/tab/tab.vue'
	export default {
		components:{
			navbar,
			tab
		},
		data() {
			return {
				tabList:[]
			}
		},
		onLoad() {
			this.getLabel()
		},
		methods: {
			getLabel(){
				// console.log(this.$api);
			this.$api.get_label({
					name:'get_label'
				}).then((res)=>{
					const {data} =res
					this.tabList = data
					console.log(res);
				})
			
			},
			tab({data,index}){
				// console.log('index',data,'index',index)
			}
		}
	}
</script>

<style>

</style>
