<template>
	<section class="conversation-list">

		<b-row class="conversation-list__search p-3">
			<b-col>
				<b-input-group>
					<b-input-group-text slot="prepend">
						<i class="fas fa-search"></i>
					</b-input-group-text>
					<b-form-input placeholder="Search" v-model.trim="filter"></b-form-input>
				</b-input-group>
			</b-col>
		</b-row>

		<conversation-teaser v-for="conversation in filtered(conversations)" :key="conversation.id"
			v-bind="{conversation: conversation}">
		</conversation-teaser>

		<b-row v-if="isLoading">
			<b-col class="text-center">
				<i class="fas fa-circle-notch fa-spin fa-2x text-secondary"></i>
			</b-col>
		</b-row>

	</section>
</template>

<script>

export default {
	name: 'ConversationList',
	computed: {
		isLoading () {
			return this.$store.getters.areConversationsLoading
		},
		conversations () {
			return this.$store.getters.conversations
		}
	},
	data () {
		return {
			filter: null
		}
	},
	created () {
		this.$store.dispatch('loadConversations', this.$store.getters.userId)
	},
	methods: {
		filtered (conversations) {
			if (!this.filter) return conversations
			return conversations.filter(c => {
				if (c.data().name && c.data().name.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0) return true

				let members = this.$store.getters.members[c.id]
				return members.filter(m => m.id !== this.$store.getters.userId)
					.filter(m => m.data().name && m.data().name.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0)
					.length
			})
		}
	}
}
</script>

<style scoped>

</style>
