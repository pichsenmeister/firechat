'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
	NODE_ENV: '"development"',
	FIREBASE_CONFIG: JSON.stringify({
		projectId: 'smsh-app',
		appName: 'Smsh',
		apiKey: 'AIzaSyDvyDBcgmYzJIH5JDrOCREWiY3qu1sEwtk',
		// authDomain: '<your-auth-domain>',
		// databaseURL: '<your-database-url>',
		// storageBucket: '<your-storage-bucket>'
	})
})
