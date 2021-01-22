import { isEqual } from './utils'

export class StoreSubscriber {
    constructor(store) {
        this.sub = null
        this.store = store
    }

    storeSubscribe(components) {
        this.prevState = this.store
        this.sub = this.store.subscribe(state => {
            Object.keys(state).forEach(key => {
                if (!isEqual(this.prevState[key], state[key])) {
                    components.forEach(comp => {
                        if (comp.isWatching(key)) {
                            const updataState = {[key]: state[key]}
                            comp.stateChanged(updataState)
                        }
                    })
                }
            })
            this.prevState = this.store.getState()

            if (process.env.NODE_ENV === 'development') {
                window['redux'] = this.prevState
            }
        })
    }
   
    storeUnsubscribe() {
        this.sub()
    }
}
