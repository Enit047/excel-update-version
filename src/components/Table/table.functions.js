import {range} from '@core/utils'

export function shouldResize(event) {
    return event.target.dataset.resize
}

export function isCell(event) {
    return event.target.dataset.type === 'cell'
}

export function matrix($current, $selected) {
    const currentCord = $current.id(true)
    const selectedCord = $selected.id(true)
    const cols = range(currentCord.col, selectedCord.col)
    const rows = range(currentCord.row, selectedCord.row)
    return rows.reduce((acc, row) => {
        cols.forEach(col => acc.push(`${row}:${col}`))
        return acc
    }, [])
}

export function nextSelector(current, key, {MAX_VALUE_COL, MAX_VALUE_ROW}) {
    let {col, row} = current.id(true)
    const MIN_VALUE = 0
    switch (key) {
        case 'Enter':
        case 'ArrowDown':
            row = row + 1 > MAX_VALUE_ROW - 1 ? MAX_VALUE_ROW - 1 : row + 1
            break
        case 'Tab':
        case 'ArrowRight':
            col = col + 1 > MAX_VALUE_COL ? MAX_VALUE_COL : col + 1
            break
        case 'ArrowLeft':
            col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1
            break
        case 'ArrowUp':
            row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1
            break
    }

    return {col, row}
}
