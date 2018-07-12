import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		conversation: null,
		loading: false,
		routeAttempt: null,
		user: null
	},
	mutations: {
		setConversation (state, payload) {
			state.conversation = payload
		},
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
		conversation: state => state.conversation,
		routeAttempt: state => state.routeAttempt,
		user: state => state.user
	}
})
