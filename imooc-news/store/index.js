import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	//数据源
	state:{
		// historyList: []
		//每次请求historyList的时候，现在本地缓存中找 如果存在就用本地缓存，如果不存在则 是一个空数组
		historyList: uni.getStorageSync('__history') || []
	},
	mutations:{
		SET_HISTORY_LIST(state,history){
			state.historyList = history
		},
		CLEAR_HISTORY(state){
			state.historyList = []
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
		clear_history({commit}){
			uni.removeStorageSync('__history')
			commit('CLEAR_HISTORY')
		}
	}
})
export default store