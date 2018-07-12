<template>
	<section class="conversation-view h-100">

		<div v-if="conversation" class="d-flex flex-column align-content-stretch h-100">
			<div class="conversation-view__header p-2 text-center">
				<span>{{ conversation.name }}</span>
			</div>

			<div class="conversation-view__main p-2 flex-grow-1">
				main
			</div>

			<div class="conversation-view__footer">
				<message-composer v-bind="{conversation: conversation}"></message-composer>
			</div>
		</div>

		<div class="d-flex justify-content-center align-items-center h-100" v-else>
			<span class="m-auto">Please select a conversation</span>
		</div>

	</section>
</template>

<script>

export default {
	name: 'ConversationView',
	computed: {
		conversation () {
			return this.$store.getters.conversation
		}
	}

}
</script>

<style scoped>

</style>
