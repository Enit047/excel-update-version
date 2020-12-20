import { ExcelComponent } from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
    static className = 'excel__formula'

    constructor($root) {
        super($root, {
            name: 'Fomrula',
            listeners: ['input']
        })
    }

    toHTML() {
        return `
            <div class="info">fx</div>
            <div class="input" contenteditable spellcheck="false"></div>
        `
    }

    onInput(event) {
        console.log(this)
        console.log('Formula', event.target.textContent)
    }
}
