<template>
	<view class="scroll">
		<scroll-view class="listScroll-content" scroll-y="true">
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
		}
	}
</script>

<style lang="scss">

	.scroll {
		flex: 1;
		overflow: hidden;
		box-sizing: border-box;
		.listScroll-content {
			display: flex;
			flex-direction: column;
			height: 100%;
		}
	}
</style>
