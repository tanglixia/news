<template>
	<view class="listItem">
		<list-scroll class="list-scroll">
			<list-card :item = item v-for="(item,index) in list" :key="index"></list-card>
		<uni-load-more status="loading" iconType="snow"></uni-load-more>
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
			}
			},
		data() {
			return {

			}
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
