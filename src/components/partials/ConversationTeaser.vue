<template>

	<b-media class="p-2 conversation-teaser" no-body :class="{'conversation-teaser--active': $store.getters.conversation && $store.getters.conversation.id === conversation.id}"
		@click="setActiveConversation(conversation)">
		<b-media-aside>
			<b-img slot="aside" :alt="conversation.name" :src="conversation.avatar" class="teaser__avatar" v-if="conversation.avatar" />
			<b-img slot="aside" :alt="conversation.name" src="https://www.gravatar.com/avatar/7ed9b5a57a659a8c4d2f38141346912d" class="conversation-teaser__avatar" v-else />
		</b-media-aside>

		<b-media-body class="my-auto ml-2">
			<h6 class="mt-1 mb-0 d-flex flex-row align-items-baseline">
				<span>{{ conversation.name }}</span>
				<small class="ml-auto text-secondary">{{ getDateDiff() }}</small>
			</h6>
			<p class="text-secondary m-0" v-if="conversation.last_message">
				<small>You: some text</small>
			</p>
		</b-media-body>
	</b-media>

</template>

<script>
export default {
	name: 'ConversationTeaser',
	props: {
		conversation: {
			type: Object,
			required: true
		}
	},
	methods: {
		getDateDiff () {
			let updated = this.$moment(this.conversation.updated_at.toString())
			let now = this.$moment()
			let days = now.diff(updated, 'days')
			let years = now.diff(updated, 'years')
			if (days === 0) {
				return updated.format('h:mma')
			} else if (days < 7) {
				return updated.format('ddd')
			} else if (years === 0) {
				return updated.format('MMM D')
			} else {
				return updated.format('MMM D, YYYY')
			}
		},
		setActiveConversation (conversation) {
			this.$store.commit('setConversation', conversation)
		}
	}
}
</script>

<style scoped>

</style>
