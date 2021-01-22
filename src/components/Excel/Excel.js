import {$} from '@core/Dom'
import {Emitter} from '@core/Emitter';
import { StoreSubscriber } from '@core/StoreSubscriber';
import { updateDate } from '@/redux/actions'
import {preventMenu} from '@/constants';

export class Excel {
    constructor(options) {
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
        if (process.env.NODE_ENV === 'production') {
            window.addEventListener('contextmenu', preventMenu)
        }
        this.store.dispatch(updateDate())
        this.storeSubscriber.storeSubscribe(this.components)
        this.components.forEach(component => {
            component.init()
        })
    }

    destroy() {
        this.components.forEach(com => com.destroy())
        this.storeSubscriber.storeUnsubscribe()
        window.removeEventListener('contextmenu', preventMenu)
    }
}
