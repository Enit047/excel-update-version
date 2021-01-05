import { ExcelComponent } from '@core/ExcelComponent';
import {$} from '@core/Dom';
import * as actions from '@/redux/actions'
import {tableName} from '@/constants';


export class Header extends ExcelComponent {
    static className = 'excel__header'
    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input'],
            ...options
        });
    }

    init() {
        super.init()
    }

    toHTML() {
        const title = this.store.getState().nameOfFile || tableName
        return `
            <input type="text" class="input" value="${title}">

            <div class="buttons">

                <div class="button">
                    <span class="material-icons">
                        delete_outline
                    </span>
                </div>

                <div class="button">
                    <span class="material-icons">
                        exit_to_app
                    </span>
                </div>

            </div>
        `
    }

    onInput(eve) {
        const value = $(eve.target).text()
        this.$dispatch(actions.changeName(value))
    }
}
