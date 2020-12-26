import { DOMListener } from '@core/DOMListener';

export class ExcelComponent extends DOMListener {
    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name || ''
        this.emitter = options.emitter
        this.unsubcribe = []
        this.prepare()
    }

    prepare() {}

    $emit(eventName, ...args) {
        this.emitter.emit(eventName, ...args)
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
