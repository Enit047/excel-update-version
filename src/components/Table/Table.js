import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table.template';
import {tableResizeFun} from './table-resize'
import {shouldResize} from './table.functions.js'

export class Table extends ExcelComponent {
    static className = 'excel__table'
    
    constructor($root) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown']
        })
    }

    toHTML() {
        return createTable(100)
    }

    onMousedown(eve) {
        if (shouldResize(eve)) {
            tableResizeFun(eve, this.$root)
        }
    }
}
