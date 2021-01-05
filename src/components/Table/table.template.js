import { toInlineStyle } from '../../core/utils';
import {defaultStyle} from '@/constants';
import { parse } from '../../core/parse';

function createCell(row, i, width, dataCell, styles) {
    const styled = width ? `width: ${width}` : ''
    return `
        <div class="cell" style="${styled}; ${styles}" contenteditable data-col="${i}" data-value="${dataCell}" data-type="cell" data-id="${row}:${i}">
            ${parse(dataCell)}
        </div>
    `
}

function createCol(letter, i, width) {
    const styled = width ? `style="width: ${width}"` : ''
    return `
        <div class="column" ${styled}  data-type="resizable" data-col="${i}">
            ${letter}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `
}

function createRow(data, info, height) {
    const styled = height ? `style="height: ${height}"` : ''
    return `
        <div class="row" ${styled} data-row="${info}" data-type="resizable">

            <div class="row-info" data-type="row">
                ${info || ''}
                ${info ? `<div class="row-resize" data-resize="row"></div>` : ''}
            </div>

            <div class="row-data">${data}</div>

        </div>
    `
}

const CODES = {
    A: 65,
    Z: 90
}

function getLength(state, index) {
    return state[index] || ''
}

function creatingCells(row, state) {
    return (_, i) => {
        const width = getLength(state.colState, i)
        const id = `${row}:${i}`
        const dataCell = getLength(state.dataState, id)
        const styles = toInlineStyle({...defaultStyle, ...state.stylesState[id]})
        return createCell(row, i, width, dataCell, styles)
    }
}

export function createTable(row = 30, state) {
    const lengthLine = CODES.Z - CODES.A + 1
    const arrHtml = []
    // _ - ain't used arg
    const cols = new Array(lengthLine).fill('')
        .map((_, i) => String.fromCharCode(CODES.A + i))
        .map((letter, i) => {
            const width = getLength(state.colState, i)
            return createCol(letter, i, width)
        })
        .join('')

    arrHtml.push(createRow(cols, null))

    for (let i = 0; i < row; i++) {
        const cells = new Array(lengthLine).fill('').map(creatingCells(i, state)).join('')
        arrHtml.push(createRow(cells, i + 1, getLength(state.rowState, +i + 1)))
    }

    return arrHtml.join('')
}
