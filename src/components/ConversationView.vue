<template>
	<section class="conversation-view d-flex flex-fill p-0">

		<div class="d-flex flex-fill flex-nowrap flex-column" v-if="activeConversation">
			<div class="container-fluid">
				<b-row class="conversation-view__header p-2 text-center">
					<b-col cols="8" offset="2">{{ name }}</b-col>
					<b-col cols="2" class="text-right">
						<i class="fas fa-info-circle pointer" @click="toggleSidebar"></i>
					</b-col>
				</b-row>
			</div>

			<div class="d-flex justify-content-center align-items-center p-2"  v-if="isLoading">
				<span>
					<i class="fas fa-circle-notch fa-spin fa-2x text-secondary"></i>
				</span>
			</div>

			<div class="conversation-view__main flex-grow-1 p-2" v-chat-scroll="{always: true, smooth: false}">
				<!-- <b-row class="m-2" v-if="isLoading">
					<b-col class="text-center">
						<i class="fas fa-circle-notch fa-spin fa-2x text-secondary"></i>
					</b-col>
				</b-row> -->
				<message-view v-for="message in activeMessages" :key="message.id" v-bind="{message: message}"></message-view>
			</div>

			<div class="conversation-view__footer">
				<message-composer v-bind="{conversation: activeConversation}"></message-composer>
			</div>
		</div>

		<div class="m-auto" v-else>
			<span>Please select a conversation</span>
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
		toggleSidebar () {
			this.$store.dispatch('toggleConversationInfoSidebar')
		}
	}

}
</script>

<style scoped>

</style>
