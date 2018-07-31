import firebase from 'firebase'
import Store from '@/store'

console.log('using env: ' + process.env.NODE_ENV)

const FirebaseApp = firebase.initializeApp(process.env.FIREBASE_CONFIG)
const firestore = firebase.firestore()
const settings = {timestampsInSnapshots: true}
firestore.settings(settings)
FirebaseApp.db = firestore

FirebaseApp.loadUser = async currentUser => {
	let user = await firestore.collection('users').doc(currentUser.uid).get()
	Store.commit('setUser', user)
}

FirebaseApp.signup = async (email, password) => {
	try {
		await firebase.auth().createUserWithEmailAndPassword(email, password)

		let currentUser = firebase.auth().currentUser
		await currentUser.sendEmailVerification()
		await FirebaseApp.db.collection('users').doc(currentUser.uid).set({
			email: currentUser.email
		})
		let user = await firestore.collection('users').doc(currentUser.uid).get()

		Store.commit('setUser', user)
		return true
	} catch (err) {
		console.error(err)
		err.error = true
		return err
	}
}

FirebaseApp.signin = async (email, password) => {
	try {
		await firebase.auth().signInWithEmailAndPassword(email, password)

		let currentUser = firebase.auth().currentUser
		let user = await firestore.collection('users').doc(currentUser.uid).get()

		Store.commit('setUser', user)
		return true
	} catch (err) {
		console.error(err)
		err.error = true
		return err
	}
}

FirebaseApp.signout = async () => {
	await firebase.auth().signOut()
}

FirebaseApp.resetPassword = async email => {
	try {
		await firebase.auth().sendPasswordResetEmail(email)
		return true
	} catch (err) {
		console.error(err)
		err.error = true
		return err
	}
}

export default FirebaseApp
