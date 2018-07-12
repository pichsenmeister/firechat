<template>
	<section class="conversation-info h-100">

		<b-row class="text-center">
			<b-col>
				<b-img slot="aside" :alt="conversation.name" :src="conversation.avatar" class="teaser__avatar" v-if="conversation.avatar" />
				<b-img slot="aside" :alt="conversation.name" src="https://www.gravatar.com/avatar/7ed9b5a57a659a8c4d2f38141346912d" class="teaser__avatar" v-else />
			</b-col>
		</b-row>

		<b-row class="text-center">
			<b-col>
				<h4>{{ conversation.name }}</h4>
			</b-col>
		</b-row>

		<conversation-teaser v-for="conversation in conversations" :key="conversation.id"
			v-bind="{conversation: conversation}">
		</conversation-teaser>

	</section>
</template>

<script>

export default {
	name: 'ConversationInfo',
	computed: {
		conversation () {
			return this.$store.getters.conversation
		}
	}
}
</script>

<style scoped>

</style>
