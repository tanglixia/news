<template>
	<view class="scroll">
		<scroll-view class="listScroll-content" scroll-y="true" @scrolltolower="loadMore">
			<view class="listScroll-box">
				<view class="listScroll-box__item">
					<slot></slot>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods:{
			loadMore(){
				console.log('触底加载')
				this.$emit('loadMore')
			}
		}
	}
</script>

<style lang="scss">

	.scroll {
		flex: 1;
		overflow: hidden;
		box-sizing: border-box;
		height: 100%;
		.listScroll-content {
			display: flex;
			flex-direction: column;
			height: 100%;
			
		}
	}
</style>
