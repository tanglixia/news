<template>
	<view class="navbar">
		<view class="navbar-fixed">
			<!-- 状态栏 -->
			
			<view :style="{height:statusBarHeight+'px'}"></view>
			<!-- 导航栏内容 -->
			<view class="navbar-content" :style="{height:navBarHeight+'px',width:windowWidth+'px'}">
				<view class="navbar-serach">
					<view class="navbar-serach_icon">
					</view>
					<view class="navbar-serach_text">
						请输入内容
					</view>
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
				statusBarHeight:20,//默认	状态栏的高度
				navBarHeight:45, //导航栏的默认高度
				windowWidth:375
			};
		},
		//组件的生命周期 ，相当于页面中的onload
		created() {
			//获取手机系统信息
			const info = uni.getSystemInfoSync()
			this.statusBarHeight = info.statusBarHeight
			this.windowWidth = info.windowWidth
			// console.log(info);
			
			//#ifndef H5 || APP-PLUS || MP-ALIPAY
			//获取胶囊的位置
			// 导航栏的高度 = (胶囊底部高度-状态栏的高度)+(胶囊顶部高度-状态栏的高度)
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			this.navBarHeight = (menuButtonInfo.bottom-this.statusBarHeight)+(menuButtonInfo.top - this.statusBarHeight)
			this.windowWidth = menuButtonInfo.left
			console.log('menB',menuButtonInfo);
			//#endif
		}
	}
</script>

<style lang="scss">
	.navbar {
		.navbar-fixed {
			width: 100%;
			background-color: $mk-base-color;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 99;

			.navbar-content {
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 0 15px;
				height: 45px;
				box-sizing: border-box;

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
	}
</style>
