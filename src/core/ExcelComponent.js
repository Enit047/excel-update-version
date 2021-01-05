import { DOMListener } from '@core/DOMListener';

export class ExcelComponent extends DOMListener {
    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name || ''
        this.emitter = options.emitter
        this.store = options.store
        this.unsubcribe = []
        this.subscribers = options.subscribers || []
        this.prepare()
    }

    prepare() {}

    stateChanged() {}

    isWatching(key) {
        return this.subscribers.includes(key)
    }

    $emit(eventName, ...args) {
        this.emitter.emit(eventName, ...args)
    }

    $dispatch(action) {
        this.store.dispatch(action)
    }
    

    $sub(eventName, fn) {
        const unsub = this.emitter.subscribe(eventName, fn)
        this.unsubcribe.push(unsub)
    }

    toHTML() {
        return ''
    }

    init() {
        this.initDOMListener()
    }

    destroy() {
        this.removeDOMListener()
        this.unsubcribe.forEach(sub => sub())
    }
}
