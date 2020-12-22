<template>
	<view>
		<view class="feedback-opinion">意见反馈：</view>
		<view class="feedback-textarea">
			<textarea class="textarea" value="" placeholder="请输入您要反馈的问题" />
			</view>
		<view class="feedback-pic">反馈图片：</view>
		<view class="feedback-image">
			<view class="feedback-image__box" v-for="(item,index) in imageLists" :key="index">
				<view class="close-icon" @click="del(index)">
					<uni-icons type="closeempty" size="18" color="#fff"></uni-icons>
				</view>
				<view class="feedback-image__box-item">
					<image :src="item.url" mode="aspectFill"></image>
				</view>
			</view>
			<view class="feedback-image__box" @click="addImage" v-if="this.imageLists.length < 5">
				<view class="feedback-image__box-item">
					<uni-icons type="plusempty" size="50" color="#eee"></uni-icons>
				</view>
			</view>
		</view>
		<button class="feedback-button" type="primary">提交反馈意见</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageLists:[]
			}
		},
		methods: {
			//删除图片
			del(index){
				this.imageLists.splice(index,1)
			},
			//上传图片
			addImage(){
				let _this = this
				let count = 5 - this.imageLists.length
				uni.chooseImage({
				    count: 5, //默认9，H5不支持count字段
				    success (res){
				        console.log(res);
						let tempFilePaths = res.tempFilePaths
						tempFilePaths.forEach((item,index)=>{
							//H5多选处理
							if(index < count){
								_this.imageLists.push({
									url:item
								})
							}
						}
						)
				    }
				});
			}
		}
	}
</script>

<style lang="scss">
	.feedback-opinion{
		margin:15px;
		margin-bottom: 0;
		font-size: 16px;
		color: #333;
	}
	.feedback-textarea{
		margin:15px;
		border:1px solid #eee;
		margin-bottom: 0;
		.textarea{
			font-size: 14px;
			color: #666;
			padding:10px;
		}
	}
	.feedback-pic{
		margin:15px;
		color: #333;
		font-size: 16px;
	}
	.feedback-image{
		display: flex;
		flex-wrap: wrap;
		box-sizing: border-box;
		padding:15px;
		.feedback-image__box{
			display: flex;
			position: relative;
			width:33.33%;
			height: 0;
			padding-top:33.33%;
			box-sizing: border-box;
			
			.close-icon{
				display: flex;
				align-items: center;
				justify-content: center;
				position: absolute;
				right: 0;
				top:0;
				width:22px;
				height: 22px;
				border-radius: 50%;
				background-color: $mk-base-color;
				z-index: 2;
			}
			.feedback-image__box-item{
				display: flex;
				position: absolute;
				justify-content: center;
				align-items: center;
				flex-shrink: 0;
				top:5px;
				left:5px;
				right: 5px;
				bottom: 5px;
				overflow: hidden;
				border-radius: 4px;
				border:1px solid #eee;
				border-radius: 5px;
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	.feedback-button{
		margin: 0 15px;
		box-sizing: border-box;
	}
</style>
