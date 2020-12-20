
function createCell() {
    return `
        <div class="cell" contenteditable></div>
    `
}

function createCol(letter) {
    return `
        <div class="column">${letter}</div>
    `
}

function createRow(data, info = '', ) {
    return `
        <div class="row">

            <div class="row-info">${info}</div>

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
    // _ - aint used arg
    const cols = new Array(lengthLine).fill('').map((_, i) => String.fromCharCode(CODES.A + i)).map(createCol).join('')

    arrHtml.push(createRow(cols))

    for (let i = 0; i < row; i++) {
        const cells = new Array(lengthLine).fill('').map(createCell).join('')
        arrHtml.push(createRow(cells, i + 1))
    }


    return arrHtml.join('')
}
