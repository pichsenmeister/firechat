<template>
	<section class="conversation-list h-100">

		<b-row class="conversation-list__search">
			<b-col>
				<b-input-group>
					<b-input-group-text slot="prepend">
						<i class="fas fa-search"></i>
					</b-input-group-text>
					<b-form-input placeholder="Search"></b-form-input>
				</b-input-group>
			</b-col>
		</b-row>

		<conversation-teaser v-for="conversation in conversations" :key="conversation.id"
			v-bind="{conversation: conversation}">
		</conversation-teaser>

	</section>
</template>

<script>

export default {
	name: 'ConversationList',
	data () {
		return {
			conversations: [
				{
					id: 1,
					name: 'David',
					updated_at: (new Date()),
					last_message: 'This is the last message from someone'
				},
				{
					id: 2,
					name: 'Peter',
					updated_at: (this.$moment().subtract(1, 'years'))
				},
				{
					id: 3,
					name: 'Carla',
					updated_at: (this.$moment().subtract(6, 'days'))
				},
				{
					id: 4,
					name: 'Carina',
					updated_at: (this.$moment().subtract(4, 'months'))
				}
			]
		}
	}
}
</script>

<style scoped>

</style>
