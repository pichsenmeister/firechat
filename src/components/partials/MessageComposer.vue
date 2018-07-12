<template>

	<div class="composer">
		<b-input-group>
			<b-input-group-text slot="prepend">
				<i class="far fa-plus-square"></i>
			</b-input-group-text>
			<b-form-textarea v-model="text" class="composer__textarea p-3" :placeholder="'Send a message to '+conversation.name"
				:rows="1">
			</b-form-textarea>
			<b-input-group-text slot="append" v-if="text && text.length" class="text-primary">
				<i class="far fa-paper-plane"></i>
			</b-input-group-text>
		</b-input-group>

	</div>

</template>

<script>
export default {
	name: 'MessageComposer',
	props: {
		conversation: {
			type: Object,
			required: true
		}
	},
	data () {
		return {
			text: null
		}
	},
	methods: {

	}
}
</script>

<style scoped>

</style>
