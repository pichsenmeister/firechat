import LocalStorage from '@/store/localstorage'
import FirebaseApp from '@/FirebaseApp'

const ConversationStore = {
	state: {
		activeConversation: null,
		composer: null,
		conversations: [],
		loading: false,
		members: {},
		offset: 0
	},
	mutations: {
		addConversation (state, payload) {
			state.conversations.push(payload)
		},
		increaseOffset (state) {
			state.offset += 20
		},
		setActiveConversation (state, payload) {
			state.activeConversation = payload
		},
		setComposer (state, payload) {
			if (!payload || !payload.length) payload = null
			state.composer = payload
		},
		setConversations (state, payload) {
			state.conversations = payload
		},
		setLoading (state, payload) {
			state.loading = payload
		},
		setMembers (state, payload) {
			state.members[payload.id] = payload.users
		}
	},
	actions: {
		addConversation ({commit, state}, payload) {
			let conversations = state.conversations
			let exists = conversations.some(c => c.id === payload.id)
			if (!exists) commit('addConversation', payload)
		},
		async loadConversations ({commit, dispatch}, payload) {
			// firestore workaround for compound queries sorted by date, see: https://firebase.google.com/docs/firestore/solutions/arrays
			// #1 load all conversations from user subcollection
			let userConversationsSnapshot = await FirebaseApp.db.collection('users').doc(payload)
				.collection('conversations')
				.orderBy('updated_at', 'desc')
				// .startAt(state.offset).limit(20)
				.get()

			// #2 load full conversations from conversation collection
			let conversationDocs = await Promise.all(userConversationsSnapshot.docs.map(doc => {
				return FirebaseApp.db.collection('conversations').doc(doc.id).get()
			}))

			// #3 load user profiles for each member of the conversation
			let conversations = await Promise.all(conversationDocs.map(async conversationDoc => {
				let conversationUsersSnapshot = await FirebaseApp.db.collection('conversations').doc(conversationDoc.id).collection('users').get()
				let userDocs = await Promise.all(conversationUsersSnapshot.docs.map(doc => {
					return FirebaseApp.db.collection('users').doc(doc.id).get()
				}))
				commit('setMembers', {id: conversationDoc.id, users: userDocs})
				return conversationDoc
			}))

			conversations.forEach(conversation => dispatch('addConversation', conversation))
			commit('increaseOffset')
		},
		async loadConversation ({commit, state}, payload) {
			// if there's already an existing conversation, save composer message to local storage
			// before setting new conversation active
			if (state.activeConversation) {
				LocalStorage.merge('conversation:' + state.activeConversation.id, { composer: state.composer })
			}

			commit('setActiveConversation', null)
			commit('setLoading', true)

			let conversation = await FirebaseApp.db.collection('conversations').doc(payload.id).get()
			// now load composer message to new conversation
			let composer = (LocalStorage.get('conversation:' + conversation.id) || {}).composer

			commit('setActiveConversation', conversation)
			commit('setComposer', composer)
			commit('setLoading', false)
		}
	},
	getters: {
		activeConversation: state => state.activeConversation,
		composer: state => state.composer,
		conversations: state => state.conversations,
		isConversationLoading: state => state.loading,
		members: state => state.members
	}
}

export default ConversationStore
