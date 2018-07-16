import Vue from 'vue'
import Router from 'vue-router'

import LayoutView from '@/components/LayoutView'
import Store from '@/store'
import UserSignin from '@/components/UserSignin'
import UserSignup from '@/components/UserSignup'
import UserPasswordReset from '@/components/UserPasswordReset'

Vue.use(Router)

const router = new Router({
	routes: [{
		path: '/login',
		name: 'UserSignin',
		component: UserSignin
	}, {
		path: '/register',
		name: 'UserSignup',
		component: UserSignup
	}, {
		path: '/reset-password',
		name: 'UserPasswordReset',
		component: UserPasswordReset
	}, {
		path: '/home',
		name: 'LayoutView',
		component: LayoutView,
		meta: {
			auth: true
		}
	},
	{ path: '*', redirect: '/home' }]
})

router.beforeEach((to, from, next) => {
	// Check for requiresAuth guard
	if (to.matched.some(record => record.meta.auth)) {
		if (!Store.getters.user) {
			Store.commit('setRouteAttempt', to.fullPath)
			next({
				path: '/login'
			})
		} else {
			next()
		}
	} else {
		next()
	}
})

export default router
