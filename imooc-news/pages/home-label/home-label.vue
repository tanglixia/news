<template>
	<view class="label">
		<view class="label-content">
			<view class="label-header">
				<text class="label-header__tags">我的标签</text>
				<text class="label-header__edit">编辑</text>
			</view>
			<view class="label-tags">
				<view class="label-tags__item" v-for="(item,index) in 18" :key="index">
					{{item}}内容
					<uni-icons class="clear" type="clear" size="20" color="red"></uni-icons>
				</view>
			</view>
		</view>
		<view class="label-recommend">
			<view class="label-recommend__title">
				<text>标签推荐</text>
			</view>
			<view class="label-recommend__box">
				<view class="label-recommend__item" v-for="(item,index) in 18" :key="index">
					{{item}}推荐
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	page{
		display: flex;
		background-color: #f4f4f4;
	}
	.label{
		width:100%;
		.label-content{
			display: flex;
			flex-direction: column;
			background-color: #fff;
			box-sizing: border-box;
			margin-bottom: 10px;
			.label-header{
				display: flex;
				justify-content: space-between;
				padding:10px;
				border-bottom: 1px solid #f5f5f5;
				.label-header__tags{
					color: #666;
					font-size: 14px;
					
				}
				.label-header__edit{
					color: #30b33a;
					font-size: 14px;
					
				}
				
			}
			.label-tags{
				display: flex;
				flex-wrap: wrap;
				padding: 10px 15px;
				padding-top:0;
				.label-tags__item{
					position: relative;
					border: 1px solid #666;
					padding:6px 10px;
					color: #666;
					margin-top:10px;
					margin-right: 10px;
					border-radius: 6px;
					.clear{
						position: absolute;
						right: -9px;
						top: -8px;
						background-color: #fff;
					}
				}
				
			}
		}
		.label-recommend{
			background-color: #fff;
			.label-recommend__title{
				padding:10px;
				color: $mk-base-color;
				font-size: 14px;
				
				border-bottom: 1px solid #f5f5f5;
			}
			.label-recommend__box{
				display: flex;
				flex-wrap: wrap;
				padding: 10px 15px;
				padding-top:0;
				.label-recommend__item{
					border: 1px solid #666;
					padding:6px;
					color: #666;
					margin-top:10px;
					margin-right: 10px;
					border-radius: 6px;
					
				}
			}
		}
	}
</style>
