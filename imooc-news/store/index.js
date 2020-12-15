import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	//数据源
	state:{
		historyList: []
	},
	mutations:{
		SET_HISTORY_LIST(state,history){
			state.historyList = history
		}
	},
	actions:{
		//commit可以调用mutations中的方法
		//history是客户端传入进来的
		set_history({commit,state},history){
			let list = state.historyList
			list.unshift(history)
			commit('SET_HISTORY_LIST',list)
		}
	}
})
export default store