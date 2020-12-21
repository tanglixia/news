<template>
	<view class="follow">
		<view class="follow-header">
			<view class="follow-header__item">
				<view class="follow-header__article" :class="{active:is_active === 0}" @click="clickActive(0)">
					文章
				</view>
				<view class="follow-header__author" :class="{active:is_active === 1}" @click="clickAuthor(1)">
					作者
				</view>
			</view>
			
		</view>
		<view class="follow-body">
			<swiper class="follow-body__swiper">
				<swiper-item class="follow-body__swiper-item">
					<list-scroll>
						<list-card v-for="item in followList" :key="item._id" :item="item"></list-card>
						
					</list-scroll>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">作者</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import listScroll from '@/components/list-scroll/list-scroll.vue'
	import listCard from '@/components/list-card/list-card.vue'
	export default {
		components:{
			listScroll,
			listCard
		},
		data() {
			return {
				is_active:0 ,//切换文章和作者是否关注
				followList:{}
			}
		},
		created() {
			this.getUpdateFollow()
		},
		methods: {
			clickActive(value){
				this.is_active =value
			},
			clickAuthor(value){
				this.is_active =value
			},
			getUpdateFollow(){
				uni.showLoading()
				this.$api.get_follow().then(res=>{
					uni.hideLoading()
					const {data} = res
					this.followList = data
					console.log(this.followList);
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		display: flex;
		height: 100%;
	}
	.follow{
		display: flex;
		flex-direction: column;
		flex:1;
		height: 100%;
		background-color: #fff;
		box-sizing: border-box;
		
		.follow-header{
			display: flex;
			align-items: center;
			border-bottom: 1px solid #f5f5f5;
			padding: 10px 20px;
			.follow-header__item{
				display: flex;
				width: 100%;
				height: 30px;
				border: 1px solid $mk-base-color;
				border-radius: 4px;
				font-size: 14px;
				color: #333;
				.follow-header__article{
					display: flex;
					align-items: center;
					justify-content: center;
					width: 50%;
					border-right: 1px solid $mk-base-color;
				}
				.follow-header__author{
					display: flex;
					align-items: center;
					justify-content: center;
					width: 50%;
				}
			}
		}
		.follow-body{
			flex: 1;
			height: 100%;
			box-sizing: border-box;
			overflow: hidden;
			.follow-body__swiper{
				height: 100%;
				
			}
		}
	}
	.active{
		color: $mk-base-color;
	}
</style>
