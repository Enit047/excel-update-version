
function createCell(row) {
    return (_, i) => {
        return `
            <div class="cell" contenteditable data-col="${i + 1}" data-type="cell" data-id="${row}:${i}"></div>
        `
    }
}

function createCol(letter, i) {
    return `
        <div class="column" data-type="resizable" data-col="${i + 1}">
            ${letter}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `
}

function createRow(data, info) {
    return `
        <div class="row" data-type="resizable">

            <div class="row-info">
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

export function createTable(row = 30) {
    const lengthLine = CODES.Z - CODES.A + 1
    const arrHtml = []
    // _ - ain't used arg
    const cols = new Array(lengthLine).fill('').map((_, i) => String.fromCharCode(CODES.A + i)).map(createCol).join('')

    arrHtml.push(createRow(cols, null))

    for (let i = 0; i < row; i++) {
        const cells = new Array(lengthLine).fill('').map(createCell(i)).join('')
        arrHtml.push(createRow(cells, i + 1))
    }


    return arrHtml.join('')
}
