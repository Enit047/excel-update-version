import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table.template';
import {tableResizeFun} from './table-resize'
import {shouldResize} from './table.functions.js'
import {LogicTable} from './LogicTable'
import {nextSelector, isCell, matrix} from '@/components/Table/table.functions';
import {$} from '@core/Dom';

export class Table extends ExcelComponent {
    static className = 'excel__table'
    
    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        })
        this.BORDERS = {
            MAX_VALUE_COL: 25,
            MAX_VALUE_ROW: 100
        }
    }

    prepare() {
        this.selecton = new LogicTable()
    }

    toHTML() {
        return createTable(this.BORDERS.MAX_VALUE_ROW)
    }

    init() {
        super.init()

        const cellB = this.$root.find('[data-id="0:0"]')
        this.selecton.select(cellB)
        this.$sub('formula:input', text => this.selecton.current.text(text))
        this.$sub('formula:enter', () => {
            this.selecton.current.focus()
        })
        this.$emit('table:selected', cellB)
    }

    onKeydown(eve) {
        const keys = ['Tab', 'Enter', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
        const {key} = eve
        if (keys.includes(key) && !eve.shiftKey) {
            eve.preventDefault()
            const {col, row} = nextSelector(this.selecton.current, key, this.BORDERS)
            const next = this.$root.find(`[data-id="${row}:${col}"]`)
            this.selecton.select(next)
            this.$emit('table:selected', next)
        }
    }

    onMousedown(eve) {
        if (shouldResize(eve)) {
            tableResizeFun(eve, this.$root)
        } else if (isCell(eve)) {
            const $selectedElem = $(eve.target)
            if (eve.shiftKey) {
                const group = matrix(this.selecton.current, $selectedElem).map(i => this.$root.find(`[data-id="${i}"]`))
                this.selecton.selectGroup($selectedElem, group)
            } else {
                this.selecton.select($selectedElem)
            }
            this.$emit('table:click', $selectedElem)
        }
    }

    onInput(eve) {
        this.$emit('table:input', $(eve.target))
    }
}

