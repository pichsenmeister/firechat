// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueMoment from 'vue-moment'
import InfiniteScroll from 'vue-infinite-scroll'
import VueChatScroll from 'vue-chat-scroll'

import firebase from 'firebase'

import App from '@/App'
import router from '@/router'
import store from '@/store'

import ConversationInfo from '@/components/ConversationInfo'
import ConversationList from '@/components/ConversationList'
import ConversationTeaser from '@/components/partials/ConversationTeaser'
import ConversationView from '@/components/ConversationView'

import MessageComposer from '@/components/partials/MessageComposer'
import MessageView from '@/components/partials/MessageView'

import NavbarHorizontal from '@/components/NavbarHorizontal'

import FirebaseApp from '@/FirebaseApp'
import '@/assets/scss/style.scss'

Vue.use(BootstrapVue)
Vue.use(VueMoment)
Vue.use(InfiniteScroll)
Vue.use(VueChatScroll)

Vue.component('conversation-info', ConversationInfo)
Vue.component('conversation-list', ConversationList)
Vue.component('conversation-teaser', ConversationTeaser)
Vue.component('conversation-view', ConversationView)

Vue.component('message-composer', MessageComposer)
Vue.component('message-view', MessageView)

Vue.component('navbar-horizontal', NavbarHorizontal)

Vue.config.productionTip = process.env.NODE_ENV === 'production'

let app

const init = () => {
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
}

firebase.auth().onAuthStateChanged(async currentUser => {
	if (currentUser) {
		await FirebaseApp.loadUser(currentUser)
	} else {
		store.commit('setUser', null)
	}
	init()
})
