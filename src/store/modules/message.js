// import LocalStorage from '@/store/localstorage'
import FirebaseApp from '@/FirebaseApp'
import layout from '../../layout'

const MessageStore = {
	state: {
		messages: {},
		activeMessages: null,
		loading: false
	},
	mutations: {
		addMessage (state, payload) {
			let message = payload.message
			let conversation = payload.conversation
			state.messages[conversation.id].messages.unshift(message)
		},
		setActiveMessages (state, messages) {
			state.activeMessages = messages
		},
		setLoading (state, payload) {
			state.loading = payload
		}
	},
	actions: {
		addMessage ({commit, state}, payload) {
			let message = payload.message
			let conversation = payload.conversation

			let exists = state.messages[conversation.id].messages.some(m => m.id === message.id)
			if (!exists) commit('addMessage', payload)
		},
		async loadMessages ({commit, dispatch, state}, conversation, lazyLoad) {
			if (!state.messages[conversation.id]) {
				state.messages[conversation.id] = {
					messages: [],
					cursor: null,
					complete: false
				}
			}

			if (!lazyLoad) {
				commit('setActiveMessages', null)
			}
			commit('setLoading', true)

			// only load if message history is not complete yet
			if (!state.messages[conversation.id].complete) {
				let cursor = state.messages[conversation.id].cursor

				let query = FirebaseApp.db.collection('conversations').doc(conversation.id)
					.collection('messages')
					.orderBy('created_at', 'desc')
				if (cursor) {
					query = query.startAfter(cursor)
				}
				let snapshot = await query.limit(15).get()

				if (!snapshot || !snapshot.docs || !snapshot.docs.length || snapshot.docs.length < 15) {
					state.messages[conversation.id].complete = true
				} else {
					snapshot.docs.forEach(message => dispatch('addMessage', {conversation: conversation, message: message}))
					state.messages[conversation.id].cursor = state.messages[conversation.id].messages[0]
				}
			}

			commit('setActiveMessages', state.messages[conversation.id].messages)
			commit('setLoading', false)
		},
		async loadConversation ({dispatch}, conversation, lazyLoad) {
			lazyLoad = lazyLoad || false
			dispatch('loadMessages', conversation, lazyLoad)
		}
	},
	getters: {
		areMessagesLoading: state => state.loading,
		activeMessages: state => state.activeMessages
	}
}

export default MessageStore
