// Pure function - Функции, которые не зависят от других функций, возращают то что он них ожидают. Функциональное программирование.

export function upFirstLetter(string) {
    if (!string) {
        return ''
    }
    return string.charAt(0).toUpperCase() + string.slice(1)
}

