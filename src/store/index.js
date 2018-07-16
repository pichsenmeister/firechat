import Vue from 'vue'
import Vuex from 'vuex'

import ConversationStore from '@/store/modules/conversation'
import MessageStore from '@/store/modules/message'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		conversation: ConversationStore,
		message: MessageStore
	},
	state: {
		loading: false,
		routeAttempt: null,
		user: null
	},
	mutations: {
		setLoading (state, payload) {
			state.loading = payload
		},
		setRouteAttempt (state, payload) {
			state.routeAttempt = payload
		},
		setUser (state, payload) {
			state.user = payload
		}
	},
	getters: {
		isLoading: state => state.loading,
		routeAttempt: state => state.routeAttempt,
		userId: state => state.user ? state.user.id : null,
		user: state => state.user ? state.user.data() : null
	}
})
