<template>
	<view class="icons" @click.stop="handleLikes">
		<uni-icons class="icons-item" :type="like?'heart-filled':'heart'" size="20" color="#f07373"></uni-icons>
	</view>
</template>

<script>
	export default {
		props: {
			items: {
				type: Object,
				default () {
					return {}
				}
			},
			types: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				like: false
			};
		},
		watch: {
			items(newVal) {
				this.like = this.items.is_like
			}
		},
		created() {
			this.like = this.items.is_like
		},
		methods: {
			//点击爱心
			handleLikes() {
				this.getUpdateLike()
				this.like = !this.like
				console.log('点击收藏');
			},
			//请求数据
			getUpdateLike() {
				uni.showLoading()
				this.$api.get_like({
					name: 'get_like',
					user_id: '5fd4734f974b69000122157b',
					article_id: this.items._id
				}).then(res => {
					uni.hideLoading(),
						uni.showToast({
							title: this.like ? '收藏成功' : '取消收藏',
							icon: 'none'
						})
					uni.$emit('update_article',this.types)
					console.log('types', this.types);
				}).catch(() => {
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style lang="scss">
	.icons {
		position: absolute;
		right: 0;
		top: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 20px;
		height: 20px;

	}
</style>
