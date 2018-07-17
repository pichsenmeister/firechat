<template>

	<b-media class="p-2 conversation-teaser" no-body :class="{'conversation-teaser--active': $store.getters.activeConversation && $store.getters.activeConversation.id === conversation.id}"
		@click="loadConversation(conversation)">
		<b-media-aside>
			<b-img slot="aside" :alt="name" :src="avatar" class="teaser__avatar" v-if="avatar" />
			<b-img slot="aside" :alt="name" src="https://www.gravatar.com/avatar/7ed9b5a57a659a8c4d2f38141346912d" class="conversation-teaser__avatar" v-else />
		</b-media-aside>

		<b-media-body class="my-auto ml-2">
			<h6 class="mt-1 mb-0 d-flex flex-row align-items-baseline">
				<span>{{ name }}</span>
				<small class="ml-auto text-secondary">{{ getDateDiff() }}</small>
			</h6>
			<p class="text-secondary m-0" v-if="preview">
				<small v-if="preview.sender.id == $store.getters.userId">You:</small>
				<small v-if="preview.type == 'text'">{{ preview.content }}</small>
				<small v-else-if="preview.type == 'image'"><i class="far fa-image"></i> Image</small>
				<small v-else-if="preview.type == 'video'"><i class="fas fa-video"></i> Video</small>
				<small v-else-if="preview.type == 'gif'"><i class="far fa-play-circle"></i> GIF</small>
				<small v-else-if="preview.type == 'location'"><i class="fas fa-map-pin"></i> Location</small>
			</p>
		</b-media-body>
	</b-media>

</template>

<script>
import UIHelper from '@/services/uihelper'

export default {
	name: 'ConversationTeaser',
	props: {
		conversation: {
			type: Object,
			required: true
		}
	},
	data () {
		return {
			name: null,
			avatar: null,
			preview: null
		}
	},
	created () {
		this.avatar = this.conversation.data().avatar
		this.name = UIHelper.getConversationName(this.conversation)
		this.preview = this.conversation.data().preview
	},
	methods: {
		getDateDiff () {
			let updated = this.$moment(this.conversation.data().updated_at.seconds * 1000)
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
		loadConversation () {
			this.$store.dispatch('loadConversation', this.conversation)
		}
	}
}
</script>

<style scoped>

</style>
