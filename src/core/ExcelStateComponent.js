import { ExcelComponent } from './ExcelComponent';

export class ExcelStateComponent extends ExcelComponent {
    constructor(...args) {
        super(...args)
    }

    get template() {
        return JSON.stringify(this.state, null, 2)
    }

    initState(state = {}) {
        this.state = {...state}
    }

    setState(value) {
        this.state = {...this.state, ...value}
        this.$root.html(this.template)
    }
}
