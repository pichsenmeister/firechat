<template>
	<section v-if="user">
		<b-container fluid class="layout d-flex flex-column" :class="{'layout--horizontal': layout.navbar && layout.navbar.type === 'horizontal'}">
			<b-row class="flex-grow-1">

				<!-- left sidebar -->
				<b-col cols="3" v-if="layout.leftSidebar && !layout.leftSidebar.hidden && !layout.userPrefs.leftSidebar.hidden"
					class="layout__sidebar layout__sidebar--left p-0">
					<component :is="layout.leftSidebar.component"></component>
				</b-col>

				<!-- main view -->
				<b-col class="layout__main p-0 align-items-stretch d-flex justify-content-center">
					<div class="m-auto" v-if="isLoading">
						<span>
							<i class="fas fa-circle-notch fa-spin fa-2x text-secondary"></i>
						</span>
					</div>
					<conversation-view v-else></conversation-view>
				</b-col>

				<!-- right sidebar -->
				<b-col cols="3" v-if="layout.rightSidebar && !layout.rightSidebar.hidden && !layout.userPrefs.rightSidebar.hidden"
					class="layout__sidebar layout__sidebar--right p-0">
					<component :is="layout.rightSidebar.component"></component>

				</b-col>

			</b-row>
		</b-container>
	</section>
</template>

<script>
export default {
	name: 'LayoutView',
	computed: {
		isLoading () {
			return this.$store.getters.isConversationLoading
		},
		layout () {
			return this.$store.getters.layout
		},
		user () {
			return this.$store.getters.user
		}
	}
}
</script>

<style scoped>

</style>
