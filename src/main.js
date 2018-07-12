// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import MomentVue from 'vue-moment'
import firebase from 'firebase'

import App from '@/App'
import router from '@/router'
import store from '@/store'

import ConversationInfo from '@/components/ConversationInfo'
import ConversationList from '@/components/ConversationList'
import ConversationTeaser from '@/components/partials/ConversationTeaser'
import ConversationView from '@/components/ConversationView'

import MessageComposer from '@/components/partials/MessageComposer'

import NavbarHorizontal from '@/components/NavbarHorizontal'

import '@/FirebaseApp'
import '@/assets/scss/style.scss'

Vue.use(BootstrapVue)
Vue.use(MomentVue)
Vue.component('conversation-info', ConversationInfo)
Vue.component('conversation-list', ConversationList)
Vue.component('conversation-teaser', ConversationTeaser)
Vue.component('conversation-view', ConversationView)

Vue.component('message-composer', MessageComposer)

Vue.component('navbar-horizontal', NavbarHorizontal)

Vue.config.productionTip = process.env.NODE_ENV === 'production'

let app

firebase.auth().onAuthStateChanged(user => {
	if (!app) {
		/* eslint-disable no-new */
		app = new Vue({
			el: '#app',
			router,
			store,
			components: {
				App
			},
			template: '<App/>'
		})
	}
	store.commit('setUser', user)
})
