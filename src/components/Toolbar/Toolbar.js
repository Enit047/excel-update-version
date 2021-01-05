import { createToolbar } from './toolbar.template';
import {$} from '@core/Dom';
import { ExcelStateComponent } from '@core/ExcelStateComponent';
import {defaultStyle} from '@/constants';

export class Toolbar extends ExcelStateComponent {
    static className = 'excel__toolbar'

    constructor($root, options) {
        super($root, {
            name: 'Toolbar',
            listeners: ['click'],
            subscribers: ['currentStyles'],
            ...options
        })
    }

    prepare() {
        this.initState(defaultStyle)
    }

    get template() {
        return createToolbar(this.state)
    }

    toHTML() {
        return this.template
    }

    stateChanged(state) {
        this.setState(state.currentStyles)
    }

    onClick(event) {
        const $target = $(event.target)
        if ($target.data.type === 'icon') {
            const value = JSON.parse($target.data.value)
            this.$emit('toolbar:choose', value)
            this.setState(value)
        }
    }
}
