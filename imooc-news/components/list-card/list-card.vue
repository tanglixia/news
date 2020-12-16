<template>
	<view class="listcard"  @click="openCard">
		<!-- 基础卡片 -->
		<view v-if="item.mode === 'base'" class="listcard-base">
			<view class="listcard-base__img">
				<image :src="item.cover[0]" mode="aspectFill"></image>
			</view>
			<view class="listcard-base__content">
				<view class="base-content__title">
					<text>{{item.title}}</text>
					<likes :items=item></likes>
				</view>
				<view class="base-content__des">
					<view class="base-content__des_label">
						<view class="base-content__des_label-item">{{item.classify}}</view>
					</view>
					<view class="base-content__des-brower">{{item.browse_count}}浏览</view>
				</view>
			</view>
		</view>

		<!-- 多图模式 -->
		<view v-if="item.mode === 'image'" class="listcard-base mode-cloumn">

			<view class="listcard-base__content">
				<view class="base-content__title">
					<text>{{item.title}}</text>
					<likes :items = item></likes>
				</view>
				<view class="listcard-base__img">
					<view class="listcard-base__img-item" v-if="index < 3" v-for="(item,index) in item.cover" :key="index">
						<image :src="item" mode="aspectFill"></image>
					</view>
				</view>
				<view class="base-content__des">
					<view class="base-content__des_label">
						<view class="base-content__des_label-item">{{item.classify}}</view>
					</view>
					<view class="base-content__des-brower">{{item.browse_count}}浏览</view>
				</view>
			</view>
		</view>
		
		<!-- 大图模式 -->
		<view v-if="item.mode === 'column'" class="listcard-base mode-image">
			<view class="listcard-base__img">
				<image :src="item.cover[0]" mode="aspectFill"></image>
			</view>
			<view class="listcard-base__content">
				<view class="base-content__title">
					<text>{{item.title}}</text>
					<likes :items=item></likes>
				</view>
				
				<view class="base-content__des">
					<view class="base-content__des_label">
						<view class="base-content__des_label-item">{{item.classify}}</view>
					</view>
					<view class="base-content__des-brower">{{item.browse_count}}浏览</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import likes from '../likes/likes.vue'
	export default {
		components:{
			likes
		},
		props:{
			mode:{
				type:String,
				default:'base'
			},
			item:{
				type:Object,
				default(){
					return {}
				}
			}
		},
		
		data() {
			return {

			};
		},
		methods:{
			openCard(){
				
				this.$emit('cardList',this.item)
			}
		}
		
	}
</script>

<style lang="scss">
	.listcard {
		display: flex;
		flex-direction: column;

		.listcard-base {
			display: flex;

			padding: 8px;
			margin: 10px;
			box-shadow: 0 0 5px 1px rgba($color: #000000, $alpha: 0.1);
			background-color: #fff;
			box-sizing: border-box;
			border-radius: 4px;

			.listcard-base__img {
				width: 60px;
				height: 60px;
				overflow: hidden;
				border-radius: 5px;
				flex-shrink: 0;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.listcard-base__content {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				margin-left: 10px;
				width: 100%;


				.base-content__title {
					font-size: 14px;
					color: #333;
					font-weight: 400;
					line-height: 1.2;
					position: relative;
					
					text {
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						padding-right: 20px;
						
						
					}
					
				}

				.base-content__des {
					display: flex;
					justify-content: space-between;
					font-size: 12px;

					.base-content__des_label {
						display: flex;

						.base-content__des_label-item {
							padding: 0 5px;
							margin-right: 5px;
							color: $mk-base-color;
							border: 1px solid $mk-base-color;
							border-radius: 15px;
						}
					}

					.base-content__des-brower {
						color: #999;
						line-height: 1.5;

					}
				}
			}

			&.mode-cloumn {
				.listcard-base__content {
					margin-left: 0;

					.listcard-base__img {
						display: flex;
						width: 100%;
						height: 70px;
						margin-top: 10px;
						margin-bottom: 10px;
						padding-left: 0;

						.listcard-base__img-item {
							width: 100%;
							height: 100%;
							margin: 0 4px;
							border-radius: 4px;
							overflow: hidden;
						}

					}

				}

			}
			&.mode-image{
				flex-direction: column;
				.listcard-base__img{
					width:100%;
					height: 100px;
					margin-bottom: 10px;
			}
			.listcard-base__content{
				margin-left: 0;
				.base-content__title{
					margin-bottom:10px;
				}
			}
		}
		}
	}
</style>
