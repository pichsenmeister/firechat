const admin = require('firebase-admin')
const serviceAccount = require('./smsh-app-firebase-adminsdk-c92a0-4c4f5be03c.json')

exports.app = admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://smsh-app.firebaseio.com'
})

exports.db = admin.firestore()
