<template>
	<view class="home">
		<navbar></navbar>
		<tab :list="tabList" @tab="tab" :tabIndex="tabIndex"></tab>
		<view class="home-list">
			<list :tabList="tabList" @change="change" :currentIndex="currentIndex"></list>
		</view>
	</view>
</template>

<script>
	import navbar from '@/components/navbar/navbar.vue'
	import tab from '@/components/tab/tab.vue'
	import listScroll from '@/components/list-scroll/list-scroll.vue'
	import listCard from '@/components/list-card/list-card.vue'
	import list from '@/components/list/list.vue'
	export default {
		components: {
			navbar,
			tab,
			listScroll,
			listCard,
			list

		},
		data() {
			return {
				tabList: [],
				tabIndex: 0, //tab栏默认值
				currentIndex: 0
			}
		},
		onLoad() {
			this.getLabel()
		},
		methods: {
			//tab栏请求数据
			getLabel() {
				this.$api.get_label({
					name: 'get_label'
				}).then((res) => {
					const {
						data
					} = res
					data.unshift({
						name: '全部'
					})
					console.log('data', data);
					this.tabList = data
					console.log('res', res);
				})

			},
			// tab栏
			tab({
				data,
				index
			}) {
				this.currentIndex = index
			},
			//swiper改变的时候
			change(index) {
				this.tabIndex = index
			}
		}
	}
</script>

<style lang="scss">
	page {
		display: flex;
		height: 100%;
	}

	.home {
		display: flex;
		flex-direction: column;
		flex: 1;
		box-sizing: border-box;
		overflow: hidden;

		.home-list {
			flex: 1;
			box-sizing: border-box;
			overflow: hidden;
		}
	}
</style>
