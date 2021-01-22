import { createStore } from './createSrore'
describe('createStore:', () => {
    test('have to return store object', () => {
        const store = createStore(() => {}, {})
        expect(store).toBeDefined()
    })
})
