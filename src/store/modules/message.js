// import LocalStorage from '@/store/localstorage'
import FirebaseApp from '@/FirebaseApp'

const MessageStore = {
	state: {
		messages: {},
		activeMessages: null,
		loading: false,
		offset: 0
	},
	mutations: {
		addMessage (state, payload) {
			let message = payload.message
			let conversation = payload.conversation
			state.messages[conversation.id].messages.unshift(message)
		},
		increaseOffset (state) {
			state.offset += 20
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

			if (!state.messages[conversation.id]) {
				state.messages[conversation.id] = {
					messages: [],
					offset: 0
				}
			}

			let exists = state.messages[conversation.id].messages.some(m => m.id === message.id)
			if (!exists) commit('addMessage', payload)
		},
		async loadMessages ({commit, dispatch, state}, conversation) {
			commit('setActiveMessages', null)
			commit('setLoading', true)

			if (!state.messages[conversation.id] || !state.messages[conversation.id].messages.length) {
				let snapshot = await FirebaseApp.db.collection('conversations').doc(conversation.id)
					.collection('messages')
					// .orderBy('created_at', 'desc')
					.get()
				console.log(snapshot.docs)

				snapshot.docs.forEach(message => dispatch('addMessage', {conversation: conversation, message: message}))
			}

			commit('setActiveMessages', state.messages[conversation.id].messages)
			// commit('increaseOffset')
			commit('setLoading', false)
		},
		async loadConversation ({dispatch}, conversation) {
			dispatch('loadMessages', conversation)
		}
	},
	getters: {
		areMessagesLoading: state => state.loading,
		activeMessages: state => state.activeMessages
	}
}

export default MessageStore
