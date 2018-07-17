<template>
	<section class="conversation-view h-100">

		<div v-if="activeConversation" class="d-flex flex-column align-content-stretch h-100">
			<div class="conversation-view__header p-2 text-center">
				<span>{{ name }}</span>
			</div>

			<div class="conversation-view__main p-2 flex-grow-1">
				main
			</div>

			<div class="conversation-view__footer">
				<message-composer v-bind="{conversation: activeConversation}"></message-composer>
			</div>
		</div>

		<div class="d-flex justify-content-center align-items-center h-100" v-else-if="isLoading">
			<span class="m-auto">Loading</span>
		</div>

		<div class="d-flex justify-content-center align-items-center h-100" v-else>
			<span class="m-auto">Please select a conversation</span>
		</div>

	</section>
</template>

<script>
import UIHelper from '@/services/uihelper'

export default {
	name: 'ConversationView',
	computed: {
		activeConversation () {
			return this.$store.getters.activeConversation
		},
		isLoading () {
			return this.$store.getters.isConversationLoading
		}
	},
	watch: {
		activeConversation (value) {
			if (!this.activeConversation) return

			this.avatar = this.activeConversation.data().avatar
			this.name = UIHelper.getConversationName(this.activeConversation)
		}
	},
	data () {
		return {
			avatar: null,
			name: null
		}
	}

}
</script>

<style scoped>

</style>
