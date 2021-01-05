import { ExcelComponent } from '@core/ExcelComponent';
import { parse } from '../../core/parse';

export class Formula extends ExcelComponent {
    static className = 'excel__formula'

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            subscribers: ['currentText'],
            ...options
        })
    }

    toHTML() {
        return `
            <div class="info">fx</div>
            <div id="input" class="input" contenteditable spellcheck="false"></div>
        `
    }

    init() {
        super.init()
        this.$formula = this.$root.find('#input')
        // My opinion about this weird situation
        // this.$sub('table:click', $cell => {
        //     this.$formula.text($cell.data.value ? $cell.data.value : $cell.text())
        // })
    }

    stateChanged(state) {
        this.$formula.text(state.currentText)
    }

    onKeydown(eve) {
        if (eve.key === 'Enter') {
            eve.preventDefault()
            this.$emit('formula:enter')
        }
    }

    onInput(event) {
        const text = event.target.textContent
        this.$emit('formula:input', text)
    }
}
