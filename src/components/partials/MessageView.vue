<template>

	<div class="message d-inline-flex mt-2">
		<span v-if="type === 'text'"> {{ content }}</span>
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
			content: null
		}
	},
	created () {
		console.log(this.message)
		this.content = this.message.data().content
		this.sender = null
		this.type = this.message.data().type

		// this.sender = UIHelper.getMessageSender(this.message)
	}
}
</script>

<style scoped>

</style>
