<template>
	<section v-if="user">
		<b-container fluid class="layout" :class="{'layout--horizontal': layout.navbar && layout.navbar.type === 'horizontal'}">
			<b-row class="h-100">

				<!-- left sidebar -->
				<b-col cols="3" v-if="layout.leftSidebar && !layout.leftSidebar.hidden"
					class="layout__sidebar layout__sidebar--left">
					<component :is="layout.leftSidebar.component"></component>
				</b-col>

				<!-- main view -->
				<b-col class="layout__main">
					<div class="d-flex justify-content-center align-items-center h-100" v-if="isLoading">
						<span class="m-auto">
							<i class="fas fa-circle-notch fa-spin fa-2x text-secondary"></i>
						</span>
					</div>
					<conversation-view v-else></conversation-view>
				</b-col>

				<!-- right sidebar -->
				<b-col cols="3" v-if="layout.rightSidebar && !layout.rightSidebar.hidden"
					class="layout__sidebar layout__sidebar--right">
					<component :is="layout.rightSidebar.component"></component>
				</b-col>

			</b-row>
		</b-container>
	</section>
</template>

<script>
import Layout from '@/layout'

export default {
	name: 'LayoutView',
	computed: {
		user () {
			return this.$store.getters.user
		},
		isLoading () {
			return this.$store.getters.isConversationLoading
		}
	},
	data () {
		return {
			layout: Layout
		}
	}
}
</script>

<style scoped>

</style>
