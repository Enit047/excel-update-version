import {upFirstLetter} from '@core/utils'

export class DOMListener {
    constructor($root, listeners = []) {
        if (!$root) {
            throw new Error('Not $root provieded for DOMListener')
        }
        this.$root = $root
        this.listeners = listeners
    }

    initDOMListener() {
        this.listeners.forEach(listener => {
            const method = capitalize(listener)
            if (!this[method]) {
                throw new Error(`Method ${method} is not implemented in ${this.name} component`)
            }
            this[method] = this[method].bind(this)
            this.$root.on(listener, this[method])
        })
    }

    removeDOMListener() {
        this.listeners.forEach(listener => {
            const method = capitalize(listener)
            if (!this[method]) {
                throw new Error(`Method ${method} is not implemented in ${this.name} component`)
            }
            this.$root.remove(listener, this[method])
        })
    }
}

function capitalize(listener) {
    return 'on' + upFirstLetter(listener)
}
