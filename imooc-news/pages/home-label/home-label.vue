<template>
	<view class="label">
		<view class="label-content">
			<view class="label-header">
				<text class="label-header__tags">我的标签</text>
				<text class="label-header__edit" @click="editList">{{is_edit?'完成':'编辑'}}</text>
			</view>
				<uni-load-more v-if="loading" status="loading" :iconSize="iconSize" iconType="snow"></uni-load-more>
			<view class="label-tags">
				<view class="label-tags__item" v-for="(item,index) in labelList" :key="index">
					{{item.name}}
					<uni-icons v-if="is_edit" class="clear" type="clear" size="20" color="red" @click="del(index)"></uni-icons>
				</view>
				<view v-if="this.labelList.length === 0 && !loading" class="no-data">
					没有数据
				</view>
			</view>
		</view>
		<view class="label-recommend">
			<view class="label-recommend__title">
				<text>标签推荐</text>
			</view>
			<uni-load-more v-if="loading" status="loading" :iconSize="iconSize" iconType="snow"></uni-load-more>
			<view class="label-recommend__box">
				<view class="label-recommend__item" v-for="(item,index) in list" :key="index" @click="add(index)">
					{{item.name}}
				</view>
				<view v-if="this.list.length === 0 && !loading" class="no-data">
					没有数据
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				is_edit: false,
				labelList: [], //我的标签 数据
				list: [], //标签推荐 数据
				iconSize:20,
				loading:true
			}
		},
		created() {
			this.getLabelList()
		},
		methods: {
			//编辑按钮
			editList() {
				if (this.is_edit) {
					this.is_edit = false
					this.updateLabel(this.labelList)
				} else {
					this.is_edit = true
				}
			},
			//我的标签
			del(index) {
				this.list.push(this.labelList[index])
				this.labelList.splice(index, 1)
			},
			add(index) {
				if (!this.is_edit) return
				this.labelList.push(this.list[index])
				this.list.splice(index, 1)
			},
			//请求数据
			getLabelList() {
				this.loading = true
				this.$api.get_label({
					type: 'all'

				}).then(res => {
					
					console.log('homeLabel', res);
					this.loading= false
					//判断current  如果为true 就是我的标签，false则是标签推荐
					const {
						data
					} = res
					this.labelList = data.filter(item => item.current)
					this.list = data.filter(item => !item.current)
				})
			},
			//更新数据
			updateLabel(label) {
				uni.showLoading()
				let labelArr = []
				label.forEach(item => {
					labelArr.push(item._id)
				})
				this.$api.update_label({
					label:labelArr
				}).then(res => {
					uni.hideLoading()
					uni.showToast({
						title:'更新成功',
						icon:'none'
					})
					console.log(res);
					uni.$emit('labelChange')
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		display: flex;
		background-color: #f4f4f4;
	}

	.label {
		width: 100%;

		.label-content {
			display: flex;
			flex-direction: column;
			background-color: #fff;
			box-sizing: border-box;
			margin-bottom: 10px;

			.label-header {
				display: flex;
				justify-content: space-between;
				padding: 10px;
				border-bottom: 1px solid #f5f5f5;

				.label-header__tags {
					color: #666;
					font-size: 14px;

				}

				.label-header__edit {
					color: #30b33a;
					font-size: 14px;

				}

			}

			.label-tags {
				display: flex;
				flex-wrap: wrap;
				padding: 10px 15px;
				padding-top: 0;

				.label-tags__item {
					position: relative;
					border: 1px solid #666;
					padding: 6px 10px;
					color: #666;
					margin-top: 10px;
					margin-right: 10px;
					border-radius: 6px;

					.clear {
						position: absolute;
						right: -9px;
						top: -8px;
						background-color: #fff;
					}
				}

			}
		}

		.label-recommend {
			background-color: #fff;

			.label-recommend__title {
				padding: 10px;
				color: $mk-base-color;
				font-size: 14px;

				border-bottom: 1px solid #f5f5f5;
			}

			.label-recommend__box {
				display: flex;
				flex-wrap: wrap;
				padding: 10px 15px;
				padding-top: 0;

				.label-recommend__item {
					border: 1px solid #666;
					padding: 6px;
					color: #666;
					margin-top: 10px;
					margin-right: 10px;
					border-radius: 6px;

				}
			}
		}
	}
	.no-data{
		width: 100%;
		text-align: center;
		padding:50px 0;
		color: #999;
		font-size: 14px;
	}
</style>
