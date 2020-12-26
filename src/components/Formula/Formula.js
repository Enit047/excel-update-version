import { ExcelComponent } from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
    static className = 'excel__formula'

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
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
        this.$sub('table:selected', $cell => {
            this.$formula.text($cell.text())
        })
        this.$sub('table:input', $cell => {
            this.$formula.text($cell.text())
        })
        this.$sub('table:click', $cell => {
            this.$formula.text($cell.text())
        })
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
