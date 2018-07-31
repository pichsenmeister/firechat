<template>

	<div class="message" :class="{'message--left': alignment === 'left', 'message--right': alignment === 'right'}">
		<div class="message__content mt-2 d-flex flex-row"
			:class="{'flex-row-reverse': alignment === 'right'}">
			<div class="message__avatar mx-1 align-self-end d-flex">
				<b-img slot="aside" :alt="sender.name" :src="sender.avatar" class="rounded-circle align-self-end" v-if="sender.avatar" />
				<b-img slot="aside" :alt="sender.name" src="https://www.gravatar.com/avatar/7ed9b5a57a659a8c4d2f38141346912d" class="rounded-circle align-self-end" v-else />
			</div>
			<div class="message__bubble align-self-start py-2 px-3 rounded">
				<span v-if="type === 'text'">{{ content }}</span>
			</div>
		</div>
		<div class="message__meta text-secondary" v-if="sender"
			:class="{'text-left': alignment === 'left', 'text-right': alignment === 'right'}">
			<small class="mr-1">{{ sender.name }},</small>
			<small>{{ time }}</small>
		</div>
	</div>

</template>

<script>
import UIHelper from '@/services/uihelper'

export default {
	name: 'MessageView',
	props: {
		message: {
			type: Object,
			required: true
		}
	},
	data () {
		return {
			sender: null,
			type: null,
			content: null,
			alignment: null
		}
	},
	created () {
		this.content = this.message.data().content
		this.sender = null
		this.type = this.message.data().type
		this.time = UIHelper.formatDate(this.message.data().created_at, this.$moment)

		this.sender = UIHelper.getMessageSender(this.message)
		this.alignment = UIHelper.getMessageAlignment(this.message, this.sender)
	}
}
</script>

<style scoped>

</style>
