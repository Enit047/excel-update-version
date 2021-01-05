import {$} from '@core/Dom'
import {Emitter} from '@core/Emitter';
import { StoreSubscriber } from '@core/StoreSubscriber';

export class Excel {
    constructor(selector, options) {
        this.$el = $(document.querySelector(selector));
        this.components = options.components || []
        this.emitter = new Emitter()
        this.store = options.store
        this.storeSubscriber = new StoreSubscriber(this.store)
    }

    getRoot() {
        const $root = $.create('div', 'excel')
        const options = {
            emitter: this.emitter,
            store: this.store
        }
        
        this.components = this.components.map(Component => {
            const $el = $.create('div', Component.className)
            const comp = new Component($el, options)
            $el.html(comp.toHTML())
            $root.append($el)
            return comp
        })

        return $root
    }

    render() {
        this.$el.append(this.getRoot())
        this.storeSubscriber.storeSubscribe(this.components)
        this.components.forEach(component => {
            component.init()
        })
    }

    destroy() {
        this.components.forEach(com => com.destroy())
        this.storeSubscriber.storeUnsubscribe()
    }
}
