<template>
	<section class="conversation-list h-100">

		<b-row class="conversation-list__search">
			<b-col>
				<b-input-group>
					<b-input-group-text slot="prepend">
						<i class="fas fa-search"></i>
					</b-input-group-text>
					<b-form-input placeholder="Search"></b-form-input>
				</b-input-group>
			</b-col>
		</b-row>

		<conversation-teaser v-for="conversation in $store.getters.conversations" :key="conversation.id"
			v-bind="{conversation: conversation}">
		</conversation-teaser>

	</section>
</template>

<script>

export default {
	name: 'ConversationList',
	created () {
		this.$store.dispatch('loadConversations', this.$store.getters.userId)
	}
}
</script>

<style scoped>

</style>
