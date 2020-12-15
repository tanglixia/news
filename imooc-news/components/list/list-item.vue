<template>
	<view class="listItem">
		<list-scroll class="list-scroll" @loadMore="loadMore" >
			<list-card :item = item v-for="(item,index) in list" :key="index"></list-card>
		<uni-load-more v-if="list.length === 0 || list.length > 5" :status="load.loading" iconType="snow"></uni-load-more>
		</list-scroll>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default(){
					return []
				}
			},
			load:{
				type:Object,
				default(){
					return {
						loading:'loading'
					}
				}
			}
			},
		data() {
			return {

			}
		},
		methods:{
			loadMore(){
				this.$emit('loadMore')
			}
			// handleCard(){
			// 	console.log('点击卡片');
			// }
		}
	}
</script>

<style lang="scss">
	.listItem{
		height: 100%;
		.list-scroll {
			height: 100%;
		}
	}
	
</style>
