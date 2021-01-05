import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table.template';
import {tableResizeFun} from './table-resize'
import {shouldResize} from './table.functions.js'
import {LogicTable} from './LogicTable'
import {nextSelector, isCell, matrix} from '@/components/Table/table.functions';
import {$} from '@core/Dom';
import * as actions from '@/redux/actions';
import {applyStylesAction, changeCurrentText, currentStylesAction} from '@/redux/actions';
import {defaultStyle} from '@/constants';
import { parse } from '../../core/parse';

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
        return createTable(this.BORDERS.MAX_VALUE_ROW, this.store.getState())
    }

    init() {
        super.init()

        const cellB = this.$root.find('[data-id="0:0"]')
        this.selectedCell(cellB)
        this.$sub('formula:input', text => {
            this.selecton.current
                .attr('data-value', text)
                .text(parse(text))
            this.updateTextInStorage(text)
        })
        this.$sub('formula:enter', () => {
            this.selecton.current.focus()
        })
        this.$sub('toolbar:choose', value => {
            this.selecton.applyStyles(value)
            this.$dispatch(applyStylesAction({
                value,
                ids: this.selecton.ids
            }))
        })
    }

    onKeydown(eve) {
        const keys = ['Tab', 'Enter', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
        const {key} = eve
        if (keys.includes(key) && !eve.shiftKey) {
            eve.preventDefault()
            const {col, row} = nextSelector(this.selecton.current, key, this.BORDERS)
            const next = this.$root.find(`[data-id="${row}:${col}"]`)
            this.selectedCell(next)
        }
    }

    async dispatchResize(eve) {
        try {
            const data = await tableResizeFun(eve, this.$root)
            this.$dispatch($(eve.target).closest(`[data-type="row"]`).$el ? actions.tableResizeActionRow(data) : actions.tableResizeActionCol(data))
        } catch (e) {
            console.warn('Error', e.message)
        }
    }

    selectedCell($el) {
        this.selecton.select($el)
        this.$emit('table:click', $el)
        // My opinion about this weird situation
        this.updateTextInStorage($el.text())
        // -------------------------------------
        this.$dispatch(currentStylesAction($el.getStyles(Object.keys(defaultStyle))))
    }

    onMousedown(eve) {
        if (shouldResize(eve)) {
            this.dispatchResize(eve)
        } else if (isCell(eve)) {
            const $selectedElem = $(eve.target)
            if (eve.shiftKey) {
                const group = matrix(this.selecton.current, $selectedElem).map(i => this.$root.find(`[data-id="${i}"]`))
                this.selecton.selectGroup($selectedElem, group)
            } else {
                this.selectedCell($selectedElem)
            }
        }
    }

    updateTextInStorage(text) {
        this.$dispatch(changeCurrentText({
            text,
            id: this.selecton.current.id()
        }))
    }

    onInput(eve) {
        this.updateTextInStorage($(eve.target).text())
    }
}

