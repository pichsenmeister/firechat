<template>
	<section class="conversation-info h-100 p-4" v-if="activeConversation">

		<b-row class="text-center">
			<b-col>
				<b-img slot="aside" :alt="name" :src="avatar" class="conversation-info__avatar" v-if="avatar" />
				<b-img slot="aside" :alt="name" src="https://www.gravatar.com/avatar/7ed9b5a57a659a8c4d2f38141346912d" class="conversation-info__avatar" v-else />
			</b-col>
		</b-row>

		<b-row class="text-center mt-2">
			<b-col>
				<h4>{{ name }}</h4>
			</b-col>
		</b-row>

	</section>
</template>

<script>
import UIHelper from '@/services/uihelper'

export default {
	name: 'ConversationInfo',
	computed: {
		activeConversation () {
			return this.$store.getters.activeConversation
		}
	},
	watch: {
		activeConversation () {
			this.initConversation()
		}
	},
	data () {
		return {
			avatar: null,
			name: null
		}
	},
	created () {
		this.initConversation()
	},
	methods: {
		initConversation () {
			if (!this.activeConversation) return

			this.avatar = this.activeConversation.data().avatar
			this.name = UIHelper.getConversationName(this.activeConversation)
		}
	}
}
</script>

<style scoped>

</style>
