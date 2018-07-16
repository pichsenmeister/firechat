<template>

	<div class="composer">
		<b-input-group>
			<b-input-group-text slot="prepend">
				<i class="far fa-plus-square"></i>
			</b-input-group-text>
			<b-form-textarea v-model="composer" class="composer__textarea p-3" :placeholder="'Send a message to '+conversation.name"
				:rows="1" :max-rows="7" @input="saveComposer">
			</b-form-textarea>
			<b-input-group-text slot="append" v-if="composer && composer.length" class="text-primary">
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
	computed: {
		composer: {
			get () {
				return this.$store.state.conversation.composer
			},
			set (value) {
				this.$store.commit('setComposer', value)
			}
		}
	},
	methods: {
		saveComposer () {
			this.$store.commit('setComposer', this.composer)
		}
	}
}
</script>

<style scoped>

</style>
