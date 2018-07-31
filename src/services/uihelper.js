import Store from '@/store'

const UIHelper = {
	getConversationName (conversation) {
		if (conversation.data().name) return name

		let users = Store.getters.members[conversation.id] || []
		return users.filter(user => user.id !== Store.getters.userId).map(user => user.data().name || user.data().email).join(', ')
	},
	getMessageSender (message) {
		let sender = {
			avatar: null,
			name: null
		}

		let conversation = Store.getters.activeConversation
		let users = Store.getters.members[conversation.id]
		let user = users.filter(user => user.id === message.data().from.ref.id)[0]

		sender.id = user.id
		sender.avatar = user.data().avatar
		sender.name = user.data().name || user.data().email
		return sender
	},
	getMessageAlignment (message, sender) {
		let layout = Store.getters.layout
		let alignment = layout.message.alignment

		if (alignment === 'left' || alignment === 'right') return alignment

		if (sender.id === Store.getters.userId) return 'right'
		return 'left'
	},
	formatDate (time, moment) {
		if (!time) time = {seconds: (new Date().getTime() / 1000)}
		let formats = Store.getters.layout.timeFormats

		time = moment(time.seconds * 1000)
		let now = moment()
		let days = now.diff(time, 'days')
		let years = now.diff(time, 'years')

		if (days === 0) {
			return time.format(formats.day)
		} else if (days < 7) {
			return time.format(formats.week)
		} else if (years === 0) {
			return time.format(formats.month)
		} else {
			return time.format(formats.year)
		}
	}
}

export default UIHelper
