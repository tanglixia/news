<template>
	<view>
		<view class="my-header">
			<view class="my-header__background">
				<image :src="userinfo.avatar" mode="aspectFill"></image>
			</view>
			<view class="my-header__image">
				<view class="my-header__image-box">
					<image :src="userinfo.avatar" mode="aspectFill"></image>
				</view>
				<view class="my-header__image-name">
					<text>{{userinfo.author_name}}</text>
				</view>
			</view>
			<view class="my-header__count">
				<view class="my-header__count-title">
					<text class="count-title__item">关注</text>
					<text class="count-title__num">{{userinfo.follow_count}}</text>
				</view>
				<view class="my-header__count-title">
					<text class="count-title__item">粉丝</text>
					<text class="count-title__num">{{userinfo.fans_count}}</text>
				</view>
				<view class="my-header__count-title">
					<text class="count-title__item">积分</text>
					<text class="count-title__num">{{userinfo.integral_count || 0}}</text>
				</view>
			</view>
		</view>

		<view class="my-header__article" @click="myArticle">
			<view class="my-header__article-left">
				<uni-icons class="article-left__icons" type="contact" size="18"></uni-icons>
				<text>我的文章</text>
			</view>
			<view class="my-header__article-arrow">
				<uni-icons type="forward" size="18"></uni-icons>
			</view>
		</view>
		<view class="my-header__opinion">
			<view class="my-header__opinion-left">
				<uni-icons class="opinion-left__icons" type="plus" size="18"></uni-icons>
				<text>意见反馈</text>
			</view>
			<view class="my-header__opinion-arrow">
				<uni-icons type="forward" size="18"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {

			}
		},
		computed: {
			...mapState(['userinfo'])
		},
		methods: {
			//我的文章页面
			myArticle(){
				uni.navigateTo({
					url:'/pages/my-article/my-article'
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f5f5f5;
	}

	.my-header {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		padding-bottom: 10px;
		position: relative;
		z-index: 1;

		// .my-header__background {
		// 	position: absolute;
		// 	z-index: -1;
		// 	background-image: url('/static/logo.png');
		// 	background-size: 100% 100%;
		// 	left: 0;
		// 	right: 0;
		// 	top: 0;
		// 	bottom: 0;
		// 	-webkit-filter: blur(8px);
		// 	/* Chrome, Opera */
		// 	-moz-filter: blur(8px);
		// 	-ms-filter: blur(8px);
		// 	filter: blur(8px);
		// 	opacity: 0.5;
		// }
		.my-header__background {
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			-webkit-filter: blur(8px);
			/* Chrome, Opera */
			-moz-filter: blur(8px);
			-ms-filter: blur(8px);
			filter: blur(8px);
			opacity: 0.5;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.my-header__image {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin-top: 20px;

			.my-header__image-box {
				flex-shrink: 0;
				overflow: hidden;
				width: 60px;
				height: 60px;
				border-radius: 50%;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.my-header__image-name {
				font-size: 16px;
				padding-top: 10px;
				font-weight: bold;
			}
		}

		.my-header__count {
			display: flex;
			align-items: center;
			justify-content: space-around;
			margin-top: 10px;

			.my-header__count-title {
				display: flex;
				flex-direction: column;
				align-items: center;
				font-size: 14px;

				.count-title__num {
					color: #999;
				}
			}
		}
	}

	.my-header__article {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 60px;
		background-color: #fff;
		box-sizing: border-box;
		padding: 0 15px;
		margin-bottom: 10px;

		.my-header__article-left {
			.article-left__icons {
				margin-right: 4px;
			}

			text {
				font-size: 16px;
			}
		}

	}

	.my-header__opinion {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 60px;
		background-color: #fff;
		box-sizing: border-box;
		padding: 0 15px;

		.my-header__opinion-left {
			.opinion-left__icons {
				margin-right: 4px;
			}

			text {
				font-size: 16px;
			}
		}
	}
</style>
