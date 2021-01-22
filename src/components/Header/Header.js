import { ExcelComponent } from '@core/ExcelComponent';
import {$} from '@core/Dom';
import * as actions from '@/redux/actions'
import {tableName} from '@/constants';
import { ActiveRoute } from '../../core/Routing/ActiveRoute';


export class Header extends ExcelComponent {
    static className = 'excel__header'
    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input', 'click'],
            ...options
        });

        this.router 
    }

    init() {
        super.init()
    }

    toHTML() {
        const title = this.store.getState().nameOfFile || tableName
        return `
            <input type="text" class="input" value="${title}">

            <div class="buttons">

                <div class="button" data-button="delete">
                    <span class="material-icons" data-button="delete">
                        delete_outline
                    </span>
                </div>

                <div class="button" data-button="exit">
                    <span class="material-icons" data-button="exit">
                        exit_to_app
                    </span>
                </div>

            </div>
        `
    }

    onClick(eve) {
        if (eve.target.matches('[data-button="delete"]')) {
            const decision = confirm('are you sure want to delete that table?')
            if (decision) {
                localStorage.removeItem(`excel:${ActiveRoute.param}`)
                ActiveRoute.navigate('')
            }
        } else if (eve.target.matches('[data-button="exit"]')) {
            ActiveRoute.navigate('')
        }
    }

    onInput(eve) {
        const value = $(eve.target).text()
        this.$dispatch(actions.changeName(value))
    }
}
