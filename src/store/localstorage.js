const LocalStorage = {
	merge (key, value) {
		let target = this.get(key) || {}
		let item = Object.assign(target, value)
		item._updated_at = new Date()
		window.localStorage.setItem(key, JSON.stringify(item))
	},
	get (key) {
		let item = window.localStorage.getItem(key)
		if (!item) return null
		return JSON.parse(item)
	},
	set: (key, value) => {
		value._updated_at = new Date()
		window.localStorage.setItem(key, JSON.stringify(value))
	},
	exists: key => !!window.localStorage.getItem(key),
	remove: key => window.localStorage.removeItem(key)
}

export default LocalStorage
