// import LocalStorage from '@/store/localstorage'
import Vue from 'vue'
import Layout from '@/layout'

const LayoutStore = {
	state: {
		layout: Layout
	},
	mutations: {
		setLayout (state, layout) {
			state.layout = layout
		}
	},
	actions: {
		loadConversation ({commit, state}, conversation) {
			let layout = state.layout
			if (layout.rightSidebar.component === 'conversation-info') layout.rightSidebar.hidden = !conversation
			if (layout.leftSidebar.component === 'conversation-info') layout.leftSidebar.hidden = !conversation
			commit('setLayout', layout)
		},
		toggleConversationInfoSidebar ({commit, state}) {
			let layout = state.layout
			if (layout.rightSidebar.component === 'conversation-info') Vue.set(layout.userPrefs.rightSidebar, 'hidden', !layout.userPrefs.rightSidebar.hidden)
			if (layout.leftSidebar.component === 'conversation-info') Vue.set(layout.userPrefs.leftSidebar, 'hidden', !layout.userPrefs.leftSidebar.hidden)

			commit('setLayout', layout)
		}
	},
	getters: {
		layout: state => state.layout
	}
}

export default LayoutStore
