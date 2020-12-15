<template>
	<view class="home">
		<navbar :isSearch="true" @input="inputChange"></navbar>
		<view class="home-search">
			<view class="home-search__box">
				<view class="search-box__hearder">
					<view class="history">
						搜索历史
					</view>
					<view class="clear">
						清空
					</view>
				</view>
				
				<view v-if="historyList.length > 0" class="search-box__content">
					<view class="search-box__content-item" v-for="item in historyList">
						{{item.name}}
					</view>
				</view>
				<view v-else class="no-data">
					没有搜索历史
				</view>
			</view>
			<button type="primary" @click="open">点击</button>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import navbar from '@/components/navbar/navbar.vue'
	export default {
		components:{
			navbar
		},
		data() {
			return {
				// historyList:{}
			}
		},
		computed:{
			...mapState(['historyList'])
		},
		methods: {
			inputChange(e){
				console.log('home-search',e);
			},
			open(){
				this.$store.dispatch('set_history',{
					name:'test'
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		display: flex;
		height: 100%;
		background-color: #f5f5f5;
	}
	.home{
		display: flex;
		flex-direction: column;
		flex: 1;
		.home-search{
			display: flex;
			flex-direction: column;
			flex: 1;
			box-sizing: border-box;
			.search-box__hearder{
				display: flex;
				justify-content: space-between;
				width:100%;
				padding:10px;
				box-sizing: border-box;
				background-color: #fff;
				font-size: 14px;
				border-bottom: 1px solid #eee;
				.history{
					color: $mk-base-color;
				}
				.clear{
					color: #4b875b ;
				}
			}
			.search-box__content{
				display: flex;
				flex-wrap: wrap;
				padding-top:0;
				box-sizing: border-box;
				padding:15px;
				background-color: #fff;
				.search-box__content-item{
					padding:2px 10px;
					margin-top: 12px;
					margin-right: 10px;
					border-radius: 5px;
					border: 1px #666 solid;
					font-size: 14px;
					color: #666;
				}
			}
		}
	}
	.no-data{
		display: flex;
		align-items: center;
		justify-content: center;
		width:100%;
		height: 200px;
		background-color: #fff;
		// text-align: center;
		font-size: 12px;
		color: #666;
	}
</style>
