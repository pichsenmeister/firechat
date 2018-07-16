import LocalStorage from '@/store/localstorage'
import FirebaseApp from '@/FirebaseApp'

const ConversationStore = {
	state: {
		composer: null,
		conversations: [],
		conversation: null,
		offset: 0
	},
	mutations: {
		increaseOffset (state) {
			state.offset += 20
		},
		setComposer (state, payload) {
			if (!payload || !payload.length) payload = null
			console.log('composer payload', payload)
			state.composer = payload
		},
		setConversation (state, payload) {
			state.conversation = payload
		},
		addConversations (state, payload) {
			state.conversations = state.conversations.concat(payload)
		}
	},
	actions: {
		async loadConversations ({commit, state}, payload) {
			console.log(payload)
			// in order to retrieve all conversations by participant ordered by latest update
			// we need to save timestamp as value of the participants as workaround,
			// see: https://firebase.google.com/docs/firestore/solutions/arrays
			let snapshotUserConv = await FirebaseApp.db.collection('users').doc(payload)
				.collection('conversations')
				.orderBy('updated_at', 'desc')
				// .startAt(state.offset).limit(20)
				.get()

			let snapshotConv = await Promise.all(snapshotUserConv.docs.map(doc => {
				return FirebaseApp.db.collection('conversations').doc(doc.id).get()
			}))

			let conversations = await Promise.all(snapshotConv.map(async doc => {
				let snapshotUsers = await FirebaseApp.db.collection('conversations').doc(doc.id).collection('users').get()
				let users = await Promise.all(snapshotUsers.docs.map(doc => {
					return FirebaseApp.db.collection('users').doc(doc.id).get()
				}))
				doc.users = users
				return doc
			}))

			console.log(conversations)
			commit('addConversations', conversations)
			commit('increaseOffset')
		},
		sortConversations ({commit, state}) {
			state.conversations.sort((a, b) => {
				return a.updated_at > b.updated_at
			})
		},
		async loadConversation ({commit, state}, payload) {
			// if there's already an existing conversation, save composer message to local storage
			// before setting new conversation active
			if (state.conversation) {
				LocalStorage.merge('conversation:' + state.conversation.id, { composer: state.composer })
			}

			let conversation = await FirebaseApp.db.collection('conversations').doc(payload.id).get()
			commit('setConversation', conversation)

			// now load composer message to new conversation
			let composer = (LocalStorage.get('conversation:' + state.conversation.id) || {}).composer
			commit('setComposer', composer)
		}
	},
	getters: {
		composer: state => state.composer,
		conversation: state => state.conversation,
		conversations: state => state.conversations,
		participants: state => state.participants

	}
}

export default ConversationStore
