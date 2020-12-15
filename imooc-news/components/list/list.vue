<template>
	<view class="list">
		<swiper class="swiper" @change="change" :current="currentIndex">
			<swiper-item class="swiper-item" v-for="(item,index) in tabList" :key="index">
				<list-item :list="listCatchData[index]" :load = "load[index]" @loadMore="loadMore"></list-item>
			</swiper-item>
		</swiper>
		
	</view>


</template>

<script>
	import listItem from './list-item.vue'
	export default {
		components: {
			listItem
		},
		props: {
			tabList: {
				type: Array,
				default: []
			},
			currentIndex: { //当前第几项
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				list: [],
				listCatchData: {}, //用来保存数据
				load:{},//初始化page
				pageSize:10
			};
		},
		watch: {
			tabList(newVal) {
				if (newVal.length === 0) return
				this.getList(this.currentIndex)
				this.$forceUpdate()
			}
		},
		// mounted() {
		// 	this.getList(current)
		// },
		methods: {
			//上拉加载
			loadMore(){
				if(this.load[this.currentIndex].loading === 'noMore') return
				 this.load[this.currentIndex].page++
				this.getList(this.currentIndex)
			},
			//swiper左右切换时事件
			change(e) {
				const {
					current
				} = e.detail
				console.log('current',e);
				//没有数据或者 数据长度等于0时
				if (!this.listCatchData[current] || this.listCatchData[current].length === 0) {
					this.getList(current)
				}

				console.log(this.tabList[current].name); //可以拿到tab名称
				this.$emit('change', current)

			},
			//请求article卡片数据
			getList(current) {
				if(!this.load[current]){
					this.load[current] = {
						page:1,
						loading:'loading'
					}
				}
				console.log('当前页数',this.load[current].page);
				this.$api.get_list({
					name: this.tabList[current].name,
					page:this.load[current].page,
					pageSize:this.pageSize
				}).then((res) => {
					const {
						data
					} = res
					//length等于0 表示没有数据
					if(data.length === 0) {
						let oldLoad = {}
						oldLoad.loading = 'noMore',
						oldLoad.page = this.load[current].page
						this.$set(this.load,current,oldLoad)
						//强制渲染页面
						this.$forceUpdate()
						return
					}
					console.log('listRes', res)
					let oldList = this.listCatchData[current] || []
					oldList.push(...data)
					this.$set(this.listCatchData, current, oldList)
				})
			}
		}
	}
</script>

<style lang="scss">
	.list {
		height: 100%;

		.swiper {
			height: 100%;

			.swiper-item {
				height: 100%;

				overflow: hidden;

			}
		}
	}
</style>
