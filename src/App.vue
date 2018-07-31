<template>
	<div id="app">
		<navbar-horizontal v-if="layout.navbar && !layout.navbar.hidden && layout.navbar.orientation === 'top'"></navbar-horizontal>
		<router-view/>
		<navbar-horizontal v-if="layout.navbar && !layout.navbar.hidden && layout.navbar.orientation === 'bottom'"></navbar-horizontal>
	</div>
</template>

<script>
import Layout from '@/layout'

export default {
	name: 'App',
	data () {
		return {
			layout: Layout
		}
	}
}
</script>

<style>

</style>
