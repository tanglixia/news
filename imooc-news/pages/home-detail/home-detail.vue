<template>
	<view class="detail">
		<view class="detail-title">
			<text>{{detailData.title}}</text>
		</view>
		<view class="detail-header">
			<view class="detail-header__image">
				<view class="detail-header__image-item">
					<image :src="detailData.author.avatar" mode="aspectFill"></image>
				</view>
			</view>
			<view class="detail-header__box">
				<view class="header-box-title">
					<text>{{detailData.author.author_name}}</text>
				</view>
				<view class="header-box-doc">
					<text>{{detailData.create_time}}</text>
					<text>{{detailData.browse_count}}浏览</text>
					<text>{{detailData.thumbs_up_count}}赞</text>
				</view>
			</view>
		</view>
		<view class="detail-content">
			xxxxxxxxxxxxxxxx
		</view>
		<view class="detail-bottom">
			<view class="detail-bottom__input">
				<text>谈谈您的看法</text>
				<uni-icons type="compose" size="22" color="#f07373"></uni-icons>
			</view>
			<view class="detail-bottom__icons">
				
					<uni-icons class="detail-bottom__icons-box" type="chat" size="22" color="#f07373"></uni-icons>
					<uni-icons class="detail-bottom__icons-box" type="heart" size="22" color="#f07373"></uni-icons>
					<uni-icons class="detail-bottom__icons-box" type="hand-thumbsup" size="22" color="#f07373"></uni-icons>
				
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detailData:{}
			}
		},
		onLoad(query) {
			console.log(query);
			//将字符串转成对象
			this.detailData = JSON.parse(query.parmas)
			console.log(this.detailData);
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.detail{
		display: flex;
		flex-direction: column;
		.detail-title{
			padding:0 15px;
			margin-top: 10px;
			text{
				font-size: 20px;
				color: #333;
				font-weight: bold;
			}
		}
		.detail-header{
			display: flex;
			align-items: center;
			box-sizing: border-box;
			padding: 0 15px;
			margin-top: 10px;
			.detail-header__image{
				padding-right: 10px;
				.detail-header__image-item{
					display: flex;
					width:50px;
					height: 50px;
					border-radius: 50%;
					overflow: hidden;
					image{
						width: 100%;
						height: 100%;
					}
				}
			}
			.detail-header__box{
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.header-box-title{
					font-size: 16px;
					color: #333;
					font-weight: bold;
				}
				.header-box-doc{
					font-size: 14px;
					color: #999;
					text{
						padding-right:6px;
					}
				}
			}
		}
		.detail-content{
			margin-top:10px;
			padding:0 15px;
			height: 1400px;
		}
		.detail-bottom{
			display: flex;
			align-items: center;
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 44px;
			padding:0 10px;
			background-color: #fff;
			border-top: 1px solid #f5f5f5;
			box-sizing: border-box;
			.detail-bottom__input{
				display: flex;
				align-items: center;
				justify-content: space-between;
				height: 30px;
				padding:0 10px;
				width: 100%;
				border:1px solid #ddd;
				border-radius: 5px;
				text{
					font-size: 14px;
					color: #999;
				}
			}
			.detail-bottom__icons{
				display: flex;
				flex-shrink: 0;
				padding-left: 10px;
				.detail-bottom__icons-box{
					position: relative;
					display: flex;
					align-items: center;
					justify-content: center;
					width: 40px;
					
				}
			}
		}
	}
</style>
