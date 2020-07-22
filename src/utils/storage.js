const storage = {
    getItem(key) {
        return localStorage.getItem(key)
    },
    getObject(key) {
        let _storage = localStorage.getItem(key)
        _storage = (_storage ? JSON.parse(_storage) : _storage)
        return _storage
    },
    setItem(key, value) {
        localStorage.setItem(key, value)
        return this.getItem(key)
    },
    setObject(key, value) {
        localStorage.setItem(key, JSON.stringify(value))
        return this.getObject(key)
    },
    removeItem(key) {
        localStorage.removeItem(key)
        return this.getItem(key)
    }
}


export default storage