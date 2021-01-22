import {$} from '../Dom';
import { ActiveRoute } from './ActiveRoute';

export class Router {
    constructor(selector, routes) {
        if (!selector) {
            throw new Error('Selector is required, input him')
        }

        this.$selected = $(selector)
        this.routes = routes
        this.page = null

        this.hashChangeEvent = this.hashChangeEvent.bind(this)
        this.init()
    }

    init() {
        window.addEventListener('hashchange', this.hashChangeEvent)
        this.hashChangeEvent()
    }

    hashChangeEvent() {
        if (this.page) {
            this.page.destroy()
        }
        this.$selected.clear()

        const Page = ActiveRoute.current.includes('excel') ? this.routes.excel : this.routes.dashboard 
        this.page = new Page(ActiveRoute.param)
        this.$selected.append(this.page.getRoot())

        this.page.afterRender()
    }

    destroy() {
        window.removeEventListener('hashchange', this.hashChangeEvent)
    }
}
