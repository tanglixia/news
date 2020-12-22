import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	//数据源
	state:{
		userinfo: uni.getStorageSync('USERINFO') || {}, //存储用户信息
		//每次请求historyList的时候，现在本地缓存中找 如果存在就用本地缓存，如果不存在则 是一个空数组
		historyList: uni.getStorageSync('__history') || []
	},
	mutations:{
		//搜索页 数据
		SET_HISTORY_LIST(state,history){
			state.historyList = history
		},
		//搜索页 清除数据
		CLEAR_HISTORY(state){
			state.historyList = []
		},
		//用户页数据
		SET_USER_INFO(state,userinfo){
			state.userinfo = userinfo
		}
	},
	actions:{
		//commit可以调用mutations中的方法
		//history是客户端传入进来的
		set_history({commit,state},history){
			let list = state.historyList
			list.unshift(history)
			uni.setStorageSync('__history',list)
			commit('SET_HISTORY_LIST',list)
		},
		//清除搜索页历史数据
		clear_history({commit}){
			uni.removeStorageSync('__history')
			commit('CLEAR_HISTORY')
		},
		//用户信息
		set_userinfo({commit},userinfo){
			uni.setStorageSync('USERINFO',userinfo) //做持久化储存
			commit('SET_USER_INFO',userinfo)
		}
	}
})
export default store