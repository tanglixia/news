<template>
	<view class="detail">
		<view class="detail-title">
			<text>{{detailData.title}}</text>
		</view>
		<view class="detail-header">
			<view class="detail-header__image">
				<view class="detail-header__image-item">
					<image :src="detailData.author.avatar" mode="aspectFill"></image>
				</view>
			</view>
			<view class="detail-header__box">
				<view class="header-box-title">
					<text>{{detailData.author.author_name}}</text>
				</view>
				<view class="header-box-doc">
					<text>{{detailData.create_time}}</text>
					<text>{{detailData.browse_count}}浏览</text>
					<text>{{detailData.thumbs_up_count}}赞</text>
				</view>
			</view>
			<button class="detail-header__follow" type="default" @click="updateFollow(detailData.author.id)">{{detailData.is_author_like?'取消关注':'关注'}}</button>
			
		</view>
		<view class="detail-content">
			<view class="detail-content__item">
				<u-parse :content="detailData.content" :noData="noData" />
			</view>
		</view>
		<view class="detail-bottom">
			<view class="detail-bottom__input" @click="openCommit">
				<text>谈谈您的看法</text>
				<uni-icons type="compose" size="22" color="#f07373"></uni-icons>
			</view>
			<view class="detail-bottom__icons">
				<uni-icons class="detail-bottom__icons-box" type="chat" size="22" color="#f07373"></uni-icons>
				<uni-icons class="detail-bottom__icons-box" @click="isFollow(detailData._id)" :type="detailData.is_like?'heart-filled':'heart'" size="22" color="#f07373"></uni-icons>
				<uni-icons class="detail-bottom__icons-box"@click="isThumbsup(detailData._id)" :type="detailData.is_thumbs_up?'hand-thumbsup-filled':'hand-thumbsup'" size="22" color="#f07373"></uni-icons>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom" :maskClick="false">
		    <view class="detail-popup">
		    	<view class="detail-popup__header">
		    		<text @click="close">取消</text>
					<text @click="submit">发布</text>
		    	</view>
				<view class="detail-popup__content">
					
						<textarea class="popup__content-textarea" maxlength="200" v-model="popupCommitValue" fixed placeholder="请输入评论内容" />
					
					<view class="popup__content-count">
						{{popupCommitValue.length}} /200
					</view>
				</view>
		    </view>
		</uni-popup>
	</view>
</template>

<script>
	import uParse from '@/components/gaoyia-parse/parse.vue'
	export default {
		components:{
			uParse
		},
		data() {
			return {
				detailData:{},//详情页数据
				noData:"<p style='font-size:14px;color:#999;text-align:center;'>数据正在加载中......</p>",
				popupCommitValue:''//评论内容的value值
			}
		},
		onLoad(query) {
			//将字符串转成对象
			this.detailData = JSON.parse(query.parmas)
			this.getDetail()
		},
		methods: {
			
			//点击底部输入框 
			openCommit(){
				this.$refs.popup.open()
			},
			//取消按钮
			close(){
				this.$refs.popup.close()
			},
			//发布按钮
			submit(){
				if(!this.popupCommitValue) {
					uni.showToast({
						title:"请输入评论内容",
						icon:'none'
					})
					return 
				}
				this.setUpdateComment(this.popupCommitValue)
			},
			//关注按钮
			updateFollow(author_id){
				
				this.updateAuthor(author_id)
			},
			//收藏
			isFollow(article_id){
				this.detailData.is_like = !this.detailData.is_like
				this.setFollow(article_id)
			},
			//点赞
			isThumbsup(article_id){
				this.setThumbsup(article_id)
			},
			//评论
			setUpdateComment(content){
				uni.showLoading()
				this.$api.update_comment({
					article_id:this.detailData._id,
					content
				}).then(res=>{
					uni.hideLoading()
					uni.showToast({
						title:'数据发布成功',
						icon:'none'
					})
					this.close()
					
					
				})
			},
			//是否关注作者
			updateAuthor(author_id){
				uni.showLoading()
				this.$api.update_author({
					author_id
				}).then(res=>{
					uni.hideLoading()
					this.detailData.is_author_like = !this.detailData.is_author_like
					this.getDetail()
					console.log('detail',this.detailData);
					uni.showToast({
						title:this.detailData.is_author_like?'关注作者成功':'取消关注作者',
						icon:'none'
					})
				})
			},
			//是否点击收藏
			setFollow(article_id){
				uni.showLoading()
				this.$api.get_like({
					article_id
				}).then(res=>{
					uni.hideLoading()
					uni.showToast({
						title:this.detailData.is_like ? '收藏成功':'取消收藏',
						icon:'none'
					})
					console.log('收藏',res);
				})
			},
			//是否点赞
			setThumbsup(article_id){
				uni.showLoading()
				this.$api.update_thumbsup({
					article_id
				}).then(res=>{
					uni.hideLoading()
					this.detailData.is_thumbs_up = true
					uni.showToast({
						title:'您已经点过赞了',
						icon:'none'
					})
					console.log('thum',res);
				})
			},
			//获取详情页数据
			getDetail(){
				this.$api.get_detail({
					article_id:this.detailData._id
				}).then(res=>{
					const { data } = res
					this.detailData = data
					console.log(this.detailData);
				})
			}
		}
	}
</script>

<style lang="scss">
	.detail{
		display: flex;
		flex-direction: column;
		.detail-title{
			padding:0 15px;
			margin-top: 10px;
			text{
				font-size: 20px;
				color: #333;
				font-weight: bold;
			}
		}
		.detail-header{
			display: flex;
			align-items: center;
			box-sizing: border-box;
			padding: 0 15px;
			margin-top: 10px;
			.detail-header__image{
				padding-right: 10px;
				.detail-header__image-item{
					display: flex;
					width:50px;
					height: 50px;
					border-radius: 50%;
					overflow: hidden;
					image{
						width: 100%;
						height: 100%;
					}
				}
			}
			.detail-header__box{
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.header-box-title{
					font-size: 16px;
					color: #333;
				}
				.header-box-doc{
					font-size: 14px;
					color: #999;
					text{
						padding-right:6px;
					}
				}
			}
			.detail-header__follow{
				height: 30px;
				color: #fff;
				font-size: 12px;
				background-color: $mk-base-color;
				margin-right: 0;
			}
		}
		.detail-content{
			margin-top:10px;
			padding:0 15px;
			min-height: 500px;
			box-sizing: border-box;
			.detail-content{
				box-sizing: border-box;
			}
		}
		.detail-bottom{
			display: flex;
			align-items: center;
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 44px;
			padding:0 10px;
			background-color: #fff;
			border-top: 1px solid #f5f5f5;
			box-sizing: border-box;
			.detail-bottom__input{
				display: flex;
				align-items: center;
				justify-content: space-between;
				height: 30px;
				padding:0 10px;
				width: 100%;
				border:1px solid #ddd;
				border-radius: 5px;
				text{
					font-size: 14px;
					color: #999;
				}
			}
			.detail-bottom__icons{
				display: flex;
				flex-shrink: 0;
				padding-left: 10px;
				.detail-bottom__icons-box{
					position: relative;
					display: flex;
					align-items: center;
					justify-content: center;
					width: 40px;
					
				}
			}
		}
		.detail-popup{
			background-color: #FFFFFF;
			.detail-popup__header{
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding:15px;
				border-bottom: 1px solid #f5f5f5;
				color: #333;
				font-size: 14px;
			}
			.detail-popup__content{
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				padding:15px;
				.popup__content-textarea{
					width: 100%;
					font-size: 14px;
					color: #333;
				}
				.popup__content-count{
					display: flex;
					justify-content: flex-end; 
					color: #999;
				}
			}
		}
	}
</style>
