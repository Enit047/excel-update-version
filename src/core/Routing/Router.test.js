import { Router } from './Router'
import { Page } from '../Page'

class Dashbord extends Page {}
class Excel extends Page {}

describe('Router', () => {
    let router

    beforeEach(() => {
        const div = document.createElement('div')
        router = new Router(div, {
            dashbord: new Dashbord(),
            excel: new Excel()
        })
    })

    test('should defined', () => {
        expect(router).toBeDefined()
    })
})
