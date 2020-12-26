export class Emitter {
    constructor() {
        this.listeners = {}
    }

    // Notify subscribers
    // formula.emit('formula:done', 1, 2, 3)
    // toolbar.emit('toolbar:click', 'underline')
    emit(eventName, ...args) {
        if (!this.listeners[eventName] || this.listeners[eventName] === []) {
            return false
        }
        this.listeners[eventName].forEach(fn => {
            fn(...args)
        })
        return true
    }

    // Subscribe to event
    // table.subscribe('formula:done', () => {})
    // table.subscribe('toolbar:click', iconName => {})
    subscribe(eventName, callback) {
        this.listeners[eventName] = this.listeners[eventName] || []
        this.listeners[eventName].push(callback)
        return () => {
            this.listeners[eventName] = this.listeners[eventName].filter(fn => fn !== callback)
        }
    }
}

// const table = new Emitter()
// const tableClick = table.subscribe('table:click', (...args) => console.log(...args))
// table.emit('table:click', 1, 2, 3, 4)
//
// setTimeout(() => {
//     table.emit('table:click', 'After 3sec')
// }, 3000)
//
// setTimeout(() => {
//     tableClick()
// }, 4000)
//
// setTimeout(() => {
//     table.emit('table:click', 'After 9sec')
// }, 9000)
