<template>
	<section class="conversation-view h-100">

		<div class="d-flex flex-column align-content-stretch h-100" v-if="activeConversation">
			<div class="conversation-view__header p-2 text-center">
				<span>{{ name }}</span>
			</div>

			<div class="conversation-view__main p-2 flex-grow-1">
				<b-row class="m-2" v-if="isLoading">
					<b-col class="text-center">
						<i class="fas fa-circle-notch fa-spin fa-2x text-secondary"></i>
					</b-col>
				</b-row>
				<div v-for="message in activeMessages" :key="message.id">
					{{ message.id }}
				</div>
			</div>

			<div class="conversation-view__footer">
				<message-composer v-bind="{conversation: activeConversation}"></message-composer>
			</div>
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
		activeMessages () {
			return this.$store.getters.activeMessages
		},
		isLoading () {
			return this.$store.getters.areMessagesLoading
		}
	},
	watch: {
		activeConversation (value) {
			if (!this.activeConversation) return
			this.name = UIHelper.getConversationName(this.activeConversation)
		},
		activeMessages (value) {
			if (!this.activeMessages) return
			this.messages = this.activeMessages
		}
	},
	data () {
		return {
			messages: null,
			name: null
		}
	},
	created () {

	},
	methods: {
		loadMessages () {

		}
	}

}
</script>

<style scoped>

</style>
