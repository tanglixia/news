<template>
	<view class="tab">
		<scroll-view class="tab-scroll" scroll-x="true">
			<view class="tab-scroll__box">
				<view 
					class="tab-scroll__item"
					v-for="(item,index) in list" 
					:key="index"
					:class="{active:activeIndex === index}"
					@click="clickTab(item,index)"
					
				>{{item.name}}</view>
			</view>
		</scroll-view>
		<view class="tab-gear">
			<uni-icons class="tab-gear__icon" type="gear" size="26" color="#666"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			list:{
				type:Array,
				default (){
					return []
				}
			},
			tabIndex:{
				type:Number,
				default:0
			}
		},
		data() {
			return {
				activeIndex:0
			};
		},
		watch:{
			tabIndex(newVal,oldVal){
				this.activeIndex = newVal
				console.log(newVal,oldVal)
			}
		},
		methods:{
			clickTab(item,index){
				// console.log(item,index);
				this.activeIndex = index
				this.$emit('tab',{data:item,index:index})
			}
		}
	}
</script>

<style lang="scss">
	.tab {
		display: flex;
		box-sizing: border-box;
		width: 100%;
		border-bottom: 1px solid #f5f5f5;

		.tab-scroll {
			display: flex;
			flex: 1;
			overflow: hidden;
			box-sizing: border-box;

			.tab-scroll__box {
				display: flex;
				align-items: center;
				width: 100%;
				height: 45px;

				.tab-scroll__item {
					display: flex;
					flex-shrink: 0;
					font-size: 14px;
					color: #333;
					padding: 0 10px;
					&.active{
						color:$mk-base-color;
					}
				}
			}
		}

		.tab-gear {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 40px;
			height: 45px;

			&::after {
				position: absolute;
				content: '';
				top: 12px;
				bottom: 12px;
				left: 0;
				width: 1px;
				background-color: #ddd;
			}
		}
	}
</style>
