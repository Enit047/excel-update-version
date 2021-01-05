export function createStore(rootReducer, initialState = {}) {
    let state = rootReducer({...initialState}, {type: '__INIT__'})
    let subscribers = []

    return {
        subscribe(fn) {
            subscribers.push(fn)
            return () => {
                subscribers = subscribers.filter(cb => cb !== fn)
            }
        },
        dispatch(action) {
            state = rootReducer(state, action)
            subscribers.forEach(fn => fn(state))
        },
        getState() {
            return state
        }
    }
}
