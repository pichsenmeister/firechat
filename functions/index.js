const functions = require('firebase-functions')

const FirebaseApp = require('./FirebaseApp')
const Message = require('./message')
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// exports.conversation = functions.https.onRequest((request, response) => {
// 	switch (request.method) {
// 	case 'GET':
// 		return Message.retrieve(request, response)
// 	case 'DELETE':
// 		return Message.delete(request, response)
// 	case 'POST':
// 		return Message.create(request, response)
// 	case 'PUT':
// 		return Message.update(request, response)
// 	default:
// 		return response.status(400).send({error: 'bad_request'})
// 	}
// })

exports.insertSamples = functions.https.onRequest((request, response) => {
	let first = [
		'David', 'Carla', 'Carina', 'Thomas', 'Emanuele', 'Lisa', 'Alan', 'John', 'Peter', 'Max', 'Matthias', 'Stefan', 'Manuel',
		'Beni', 'Verena', 'Philipp', 'Tim', 'Paul', 'Rod', 'Jack', 'Felix'
	]
	let last = [
		'Vader', 'Schranz', 'Pixi', 'Jedi', 'Yoda', 'Trooper', 'Escobar', 'Padawan', 'Deathstar', 'Wingman', 'Punk', 'Yolo'
	]

	let name = first[Math.floor(Math.random() * (last.length + 1))] + ' ' + last[Math.floor(Math.random() * (last.length + 1))]
	let data = {
		type: 'text',
		content: 'Some sample text goes here',
		from: {
			name: name
		},
		to: [{
			name: 'David'
		}]
	}

	let docId
	let fromUserId
	let userId = 'm9VvMz1gbXQBCx1sQLUEbevqsnP2'

	// #1 load user
	return FirebaseApp.db.collection('users').doc('m9VvMz1gbXQBCx1sQLUEbevqsnP2').set({name: 'David', email: 'david@orat.io'})
		.then(() => {
			// #2 create conversation
			return FirebaseApp.db.collection('conversations').add({
				updated_at: new Date()
			})
		})
		.then(doc => {
			docId = doc.id
			console.log(docId)
			return doc
		})
		.then(() => {
			// #3 add new from user
			return FirebaseApp.db.collection('users').add(data.from)
		})
		.then(doc => {
			fromUserId = doc.id
			// #4 add newly added users to conversation
			return FirebaseApp.db.collection('conversations').doc(docId).collection('users').doc(fromUserId).set({
				ref: FirebaseApp.db.collection('users').doc(fromUserId)
			})
		})
		.then(() => {
			// #5 add to user to conversation
			return FirebaseApp.db.collection('conversations').doc(docId).collection('users').doc(userId).set({
				ref: FirebaseApp.db.collection('users').doc(userId)
			})
		})
		.then(() => {
			// #6 add message
			data.from.ref = FirebaseApp.db.collection('users').doc(fromUserId)
			data.to[0].ref = FirebaseApp.db.collection('users').doc(userId)

			let promises = []
			for (let i = 0; i < 50; i++) {
				let promise = new Promise((resolve, reject) => {
					console.log('set timeout')
					setTimeout(() => {
						console.log('resolve')
						resolve()
					}, i * 1000)
				})
				promise.then(() => {
					console.log('add message')
					data.created_at = new Date()
					data.updated_at = new Date()
					return FirebaseApp.db.collection('conversations').doc(docId).collection('messages').add(data)
				})

				promises.push(promise)
			}

			return Promise.all(promises)
		})
		.then(() => {
			// #6 add message
			data.from.ref = FirebaseApp.db.collection('users').doc(fromUserId)
			data.to[0].ref = FirebaseApp.db.collection('users').doc(userId)

			let promises = []
			for (let i = 0; i < 15; i++) {
				data.created_at = new Date()
				data.updated_at = new Date()
				promises.push(FirebaseApp.db.collection('conversations').doc(docId).collection('messages').add(data))
			}

			return Promise.all(promises)
		})
		.then(() => {
			return FirebaseApp.db.collection('users').doc(userId).collection('conversations').doc(docId).set({
				ref: FirebaseApp.db.collection('conversations').doc(docId),
				updated_at: new Date()
			})
		})
		.then(() => {
			return FirebaseApp.db.collection('users').doc(fromUserId).collection('conversations').doc(docId).set({
				ref: FirebaseApp.db.collection('conversations').doc(docId),
				updated_at: new Date()
			})
		})
		.then(() => response.send({status: 'ok'}))
})
