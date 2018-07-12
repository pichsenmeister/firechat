<template>
	<section v-if="user">
		<b-container fluid class="layout" :class="{'layout--horizontal': layout.navbar && layout.navbar.type === 'horizontal'}">
			<b-row class="h-100">
				<!-- left sidebar -->
				<b-col cols="3" v-if="layout.leftSidebar && !layout.leftSidebar.hidden"
					class="layout__sidebar layout__sidebar--left">
					<component :is="layout.leftSidebar.component"></component>
				</b-col>

				<!-- conversation -->
				<b-col class="layout__main">
					<conversation-view></conversation-view>
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
	name: 'UserDashboard',
	computed: {
		user () {
			return this.$store.getters.user
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
