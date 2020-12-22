<template>
	<view class="listAuthor">
		<view class="listAuthor-image">
			<image :src="item.avatar" mode="aspectFill"></image>
		</view>
		<view class="listAuthor-content">
			<view class="listAuthor-content__title">
				{{item.author_name}}
			</view>
			<view class="listAuthor-content__des">
				<view class="listAuthor-content__des-info">
					{{item.professional}}
				</view>
				<view class="listAuthor-content__des-count">
					<view class="content__des-count__post">
						发帖	{{item.article_ids.length}}
					</view>
					<view class="content__des-count__fans">
						粉丝	{{item.fans_count}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			item:{
				type:Object,
				default:{}
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.listAuthor{
		display: flex;
		padding:10px 0;
		margin:0 10px;
		border-bottom: 1px solid #f5f5f5;
		box-sizing: border-box;
		.listAuthor-image{
			display: flex;
			flex-shrink: 0;
			width:40px;
			height: 40px;
			border-radius: 4px;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.listAuthor-content{
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			margin-left: 10px;
			width: 100%;
			.listAuthor-content__title{
				font-size: 14px;
				color: #333;
				font-weight: bold;
			}
			.listAuthor-content__des{
				display: flex;
				justify-content: space-between;
				.listAuthor-content__des-info{
					font-size: 12px;
					color: #999;
				}
				.listAuthor-content__des-count{
					display: flex;
					font-size: 12px;
					color: #999;
					.content__des-count__post{
						margin-right: 10px;
					}
				}
			}
		}
	}
</style>
