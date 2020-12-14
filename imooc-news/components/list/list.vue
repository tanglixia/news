<template>
	<view class="list">
		<swiper class="swiper" @change="change" :current="currentIndex">
			<swiper-item class="swiper-item" v-for="(item,index) in tabList" :key="index">
				<list-item :list="listCatchData[index]"></list-item>
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
				listCatchData: {} //用来保存数据
			};
		},
		watch: {
			tabList(newVal) {
				if (newVal.length === 0) return
				this.getList(this.currentIndex)
			}
		},
		// mounted() {
		// 	this.getList(current)
		// },
		methods: {
			change(e) {
				const {
					current
				} = e.detail
				//没有数据或者 数据长度等于0时
				if (!this.listCatchData[current] || this.listCatchData[current].length === 0) {
					this.getList(current)
				}

				console.log(this.tabList[current].name); //可以拿到tab名称
				this.$emit('change', current)

			},
			getList(current) {

				this.$api.get_list({
					name: this.tabList[current].name
				}).then((res) => {
					const {
						data
					} = res
					// this.list = data
					console.log('listRes', res)
					// this.listCatchData = 
					this.$set(this.listCatchData, current, data)
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
