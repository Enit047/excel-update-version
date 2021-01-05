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

export function storage(name, data = null) {
    if (!data) {
        return JSON.parse(localStorage.getItem(name))
    }
    localStorage.setItem(name, JSON.stringify(data))
}

export function isEqual(a, b) {
    if (typeof a === 'object' && typeof b === 'object') {
        return JSON.stringify(a) === JSON.stringify(b)
    }
    return a === b
}

export function camelCaseToDash(text) {
    return text.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`)
}

export function toInlineStyle(styles = {}) {
    return Object.keys(styles)
    .map(i => `${camelCaseToDash(i)}: ${styles[i]}`)
    .join(';')
}

export function debounce(fn, wait) {
    let timeout
    return (...args) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            clearTimeout(timeout)
            fn(...args)
        }, wait)
    }
}

