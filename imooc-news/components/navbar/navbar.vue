<template>
	<view class="navbar">
		<view class="navbar-fixed">
			<view class="navbar-serach">
				<view class="navbar-serach_icon">
				</view>
				<view class="navbar-serach_text">
					1111
				</view>
			</view>
		</view>
		<view style="height: 45px;"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		created() {
		
		}
	}
</script>

<style lang="scss">
	.navbar {
		.navbar-fixed {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 45px;
			background-color: $mk-base-color;
			box-sizing: border-box;
			padding: 0 15PX;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 99;
			.navbar-serach {
				display: flex;
				align-items: center;
				padding: 0 10px;
				height: 30px;
				width: 100%;
				border-radius: 30px;
				background-color: #fff;

				.navbar-serach_icon {
					width: 10px;
					height: 10px;
					border: 1px solid red;
					margin-right: 10px;
				}

				.navbar-serach_text {
					font-size: 12px;
					color: #999
				}
			}
		}
	}
</style>