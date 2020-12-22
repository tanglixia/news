<template>
	<view>
		<uni-load-more v-if="this.ArticleList.length === 0" status="loading"></uni-load-more>
		<list-card v-for="item in ArticleList" :item=item :key="item._id" ></list-card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ArticleList:[]
			}
		},
		created() {
			this.getMyActive()
		},
		methods: {
			getMyActive(){
				this.$api.get_my_article()
				.then(res=>{
					const {data} = res
					this.ArticleList = data
				})
			}
		}
	}
</script>

<style>

</style>
