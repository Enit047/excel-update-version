export class CreateStoreClass {
    constructor(rootReducer, initialState = {}) {
        this.rootReducer = rootReducer
        this.initialState = initialState
    }

    // eslint-disable-next-line no-invalid-this
    #state = this.rootReducer(this.initialState, { type: '__INIT__' })
    #subscribers = []
    
    subscribe(fn) {
        this.#subscribers.push(fn)
        return () => {
            this.#subscribers = this.#subscribers.filter(cb => cb !== fn)
        }
    }
    
    dispatch(action) {
        this.#state = this.rootReducer(this.#state, action)
        this.#subscribers.forEach(fn => fn(this.#state))
    }
    
    getState() {
        return this.#state
    }
}
