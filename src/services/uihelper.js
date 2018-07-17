import Store from '@/store'

const UIHelper = {
	getConversationName (conversation) {
		if (conversation.data().name) return name

		let users = Store.getters.members[conversation.id] || []
		return users.filter(user => user.id !== Store.getters.userId).map(user => user.data().name || user.data().email).join(', ')
	}
}

export default UIHelper
