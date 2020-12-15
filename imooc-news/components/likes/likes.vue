<template>
	<view class="icons" @click.stop="handleLikes">
		<uni-icons class="icons-item" :type="like?'heart-filled':'heart'" size="20" color="#f07373"></uni-icons>
	</view>
</template>

<script>
	export default {
		props:{
			items:{
				type:Object,
				default(){
					return {}
				}
			}
		},
		data() {
			return {
				like:false
			};
		},
		methods:{
			//点击爱心
			handleLikes(){
				this.getUpdateLike()
				this.like = !this.like
				console.log('点击收藏');
			},
			//请求数据
			getUpdateLike(){
				this.$api.get_like({
					name:'get_like',
					user_id:'5fd4734f974b69000122157b',
					article_id:this.items._id
				}).then(res=>{
					console.log('res',res);
				})
			}
		}
	}
</script>

<style lang="scss">
	.icons{
		position: absolute;
		right: 0;
		top:0;
		display: flex;
		align-items: center;
		justify-content: center;
		width:20px;
		height: 20px;
		
	}
</style>
