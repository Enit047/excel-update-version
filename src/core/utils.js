// Pure function - Функции, которые не зависят от других функций, возращают то что он них ожидают. Функциональное программирование.

export function upFirstLetter(string) {
    if (!string) {
        return ''
    }
    return string.charAt(0).toUpperCase() + string.slice(1)
}

export function range(start, end) {
    if (start > end) {
        [end, start] = [start, end]
    }
    return new Array(end - start + 1)
        .fill('')
        .map((_, i) => i + start)
}
