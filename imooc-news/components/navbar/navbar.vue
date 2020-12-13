<template>
	<view class="navbar">
		<view class="navbar-search">
			<!-- 状态栏高度 -->
			<view :style="{height:statusBarHeight+'px'}"></view>
			<!-- <view style="height: 20px;"></view> -->
			<!-- 导航栏 内容-->
			<view class="navbar-search_content" :style="{height:navbarHeight+ 'px',width:windowWith+'px'}">
				<view class="navbar-search_box">
					<view class="navbar-search_icon">
						<uni-icons type="search" size="16" color="#999"></uni-icons>
					</view>
					<view class="navbar-search_input">请输入内容</view>
				</view>
			
			</view>
		</view>
		<view :style="{height:statusBarHeight + navbarHeight + 'px'}"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusBarHeight: 20, //默认状态栏高度
				navbarHeight: 45, //默认导航栏高度
				windowWith:375 //默认宽度
			};
		},
		//组件的生命周期 ，相当于页面中的onload
		created() {
			const info = uni.getSystemInfoSync()
			this.statusBarHeight = info.statusBarHeight
			console.log('info', info);
			//#ifndef H5 || APP-PLUS || MP-ALIPAY
			//获取胶囊的位置
			const  menuButtonHeight = uni.getMenuButtonBoundingClientRect()
			//导航栏高度 = (胶囊底部高度 - 状态栏高度)+(胶囊顶部高度 - 状态栏高度)
			this.navbarHeight = (menuButtonHeight.bottom - this.statusBarHeight)+(menuButtonHeight.top - this.statusBarHeight)
			this.windowWith = menuButtonHeight.left
			//#endif
		}
	}
</script>

<style lang="scss">
	.navbar {
		.navbar-search {
			
			position: fixed;
			top: 0;
			left: 0;
			z-index: 2;
			width: 100%;
			
			background-color: $mk-base-color;
			.navbar-search_content {
				display: flex;
				justify-content: center;
				align-items: center;
				// height: 45px;
				padding: 0 15px;
				background-color: $mk-base-color;
				box-sizing: border-box;
				.navbar-search_box {
					display: flex;
					align-items: center;
					background-color: #fff;
					height: 30px;
					width: 100%;
					border-radius: 30px;
					padding: 0 10px;

					.navbar-search_icon {
						margin-right: 6px;
					}

					.navbar-search_input {
						color: #999;
						font-size: 14px;
					}
				}
			}
		}
	}
</style>
