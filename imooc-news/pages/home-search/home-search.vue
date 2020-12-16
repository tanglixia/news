<template>
	<view class="home">
		<navbar :isSearch="true" @input="inputChange" v-model="value"></navbar>
		<view class="home-search">
			<view v-if="is_history" class="home-search__box">
				<view class="search-box__hearder">
					<view class="history">
						搜索历史
					</view>
					<view class="clear">
						清空
					</view>
				</view>
				
				<view v-if="historyList.length > 0" class="search-box__content">
					<view class="search-box__content-item" v-for="(item,index) in historyList" :key="index" @click="openHistroy(item)">
						{{item.name}}
					</view>
				</view>
				<view v-else class="no-data">
					没有搜索历史
				</view>
			</view>
			<scroll-view v-else class="listScroll-content" scroll-y="true" @scrolltolower="loadMore">
					<uni-load-more v-if="showLoading" status="loading" iconType="snow"></uni-load-more>
				<view v-if="searchList.length > 0">
					<list-card
					:item = item v-for="(item,index) in searchList" 
					:key="index"
					@cardList="cardList"
					></list-card>
				</view>
				<view v-if="searchList.length === 0 && showLoading == false" class="no-data">
					没有搜索到相关数据
				</view>
			</scroll-view>
			
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
				value:'',
				is_history:true,
				searchList:[],
				showLoading:false
			}
		},
		computed:{
			...mapState(['historyList'])
		},
		methods: {
			//点击历史按钮
			openHistroy(item){
				this.value = item.name
				this.getSearch(this.value)
			},
			//点击卡片
			cardList(){
				this.$store.dispatch('set_history',{
					name:this.value,
				})
			},
			//input框中的值改变时
			inputChange(value){
				if(!value){
					clearTimeout(this.timer)
					this.mark = false
					this.getSearch(value)
					return
				}
				if(!this.mark){
					this.mark = true
					this.timer = setTimeout(()=>{
						this.mark = false
						this.getSearch(value)
					},1000)
					
				}
				
			},
			getSearch(value) {
				this.showLoading = true
				if(!value){
					this.searchList = []
					// this.getSearch(value)
					this.is_history = true
					return
				}
				this.is_history = false
				this.$api.get_search({
					value,
					user_id:'5fd4734f974b69000122157b'
				}).then((res) => {
					const {
						data
					} = res
					console.log('ressearch',res);
					this.searchList = data
					this.showLoading = false
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
		.listScroll-content {
			display: flex;
			flex-direction: column;
			height: 100%;
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
