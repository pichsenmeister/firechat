<template>
	<section class="conversation-list h-100">

		<b-row class="conversation-list__search">
			<b-col>
				<b-input-group>
					<b-input-group-text slot="prepend">
						<i class="fas fa-search"></i>
					</b-input-group-text>
					<b-form-input placeholder="Search" v-model.trim="filter"></b-form-input>
				</b-input-group>
			</b-col>
		</b-row>

		<conversation-teaser v-for="conversation in filtered($store.getters.conversations)" :key="conversation.id"
			v-bind="{conversation: conversation}">
		</conversation-teaser>

	</section>
</template>

<script>

export default {
	name: 'ConversationList',
	created () {
		this.$store.dispatch('loadConversations', this.$store.getters.userId)
	},
	data () {
		return {
			filter: null
		}
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
