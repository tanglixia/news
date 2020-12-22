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
			<swiper class="follow-body__swiper" :current="this.is_active" @change="changeTab">
				<swiper-item class="follow-body__swiper-item">
					<list-scroll>
						<uni-load-more v-if="followList.length === 0 && !this.followShow" iconType="snow" status="loading"></uni-load-more>
						<list-card v-for="item in followList" :key="item._id" :item="item" types="follow"></list-card>
						<view v-if="followShow" class="no-data">
							没有数据
						</view>
					</list-scroll>
				</swiper-item>
				<swiper-item>
					<list-scroll>
						<list-author v-for="item in authorList" :key="item._id" :item="item"></list-author>
					</list-scroll>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import listScroll from '@/components/list-scroll/list-scroll.vue'
	import listCard from '@/components/list-card/list-card.vue'
	import listAuthor from '@/components/list-author/list-author.vue'
	export default {
		components:{
			listScroll,
			listCard,
			listAuthor
		},
		data() {
			return {
				is_active:0 ,//切换文章和作者是否关注
				followList:[],//收藏文章数据
				followShow:false, //是否显示没有数据
				authorList:[] //关注作者信息
			}
		},
		onLoad() {
			//自定义事件只能在打开的页面触发 
			uni.$on('update_article',()=>{	
			this.getUpdateFollow()
			})
			uni.$on('update_author',()=>{
				this.getAuthor()
			})
			this.getUpdateFollow()
			this.getAuthor()
		},
		methods: {
			changeTab(e){
				this.is_active = e.detail.current
				// console.log('followe',e);
			},
			clickActive(value){
				this.is_active =value
			},
			clickAuthor(value){
				this.is_active =value
			},
			getUpdateFollow(){
				this.$api.get_follow().then(res=>{	
					const {data} = res
					this.followList = data
					this.followShow =this.followList.length === 0 ? true:false
					console.log(this.followList);
				})
			},
			//获取作者信息
			getAuthor(){
				this.$api.get_author().then(res=>{
					const {data} = res
					this.authorList = data
					
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
				color: #666;
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
	.no-data{
		padding:50px;
		color: #999;
		font-size: 14px;
		text-align: center;
	}
</style>
