<template>

	<div class="composer">
		<b-input-group>
			<b-input-group-text slot="prepend">
				<i class="far fa-plus-square"></i>
			</b-input-group-text>
			<b-form-textarea v-model="composer" class="composer__textarea p-3" :placeholder="'Send a message to '+name"
				:rows="1" :max-rows="7" @input="saveComposer">
			</b-form-textarea>
			<b-input-group-text slot="append" v-if="composer && composer.length" class="text-primary">
				<i class="far fa-paper-plane"></i>
			</b-input-group-text>
		</b-input-group>

	</div>

</template>

<script>
import UIHelper from '@/services/uihelper'

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
				return this.$store.getters.composer
			},
			set (value) {
				this.$store.commit('setComposer', value)
			}
		}
	},
	data () {
		return {
			name: null
		}
	},
	created () {
		this.name = UIHelper.getConversationName(this.conversation)
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
