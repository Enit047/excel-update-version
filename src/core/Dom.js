class Dom {
    constructor(selector) {
        // '#app' || event.target
        this.$el = typeof selector === 'string' 
            ? document.querySelector(selector)
            : selector
    }

    html(html) {
        if (typeof html === 'string') {
            this.$el.innerHTML = html
            return this
        }
        return this.$el.outerHTML.trim()
    }

    text(text) {
        if (this.$el.tagName === 'INPUT') {
            return this.$el.value
        } else {
            if (typeof text === 'string') {
                this.$el.textContent = text
                return this
            }
            return this.$el.textContent
        }
    }

    attr(nameAttr, value) {
        if (value) {
            this.$el.setAttribute(nameAttr, value)
            return this
        }
        return this.$el.getAttribute(nameAttr)
    }

    on(eventType, callback) {
        this.$el.addEventListener(eventType, callback)
    }

    remove(eventType, callback) {
        this.$el.removeEventListener(eventType, callback)
    }

    clear() {
        this.html('')
        return this
    }

    find(selector) {
        return $(this.$el.querySelector(selector))
    }

    addClass(selector) {
        return this.$el.classList.add(selector)
    }

    removeClass(selector) {
        return this.$el.classList.remove(selector)
    }

    id(parse) {
        if (parse) {
            const parse = this.id().split(':')
            return {
                row: +parse[0],
                col: +parse[1]
            }
        }
        return this.data.id
    }

    focus() {
        this.$el.focus()
    }

    append(domNode) {
        if (domNode instanceof Dom) {
            domNode = domNode.$el
        }

        if (Element.prototype.append) {
            this.$el.append(domNode)
        } else {
            this.$el.appendChild(domNode)
        }
    }

    get data() {
        return this.$el.dataset
    }

    findAll(selector) {
        return this.$el.querySelectorAll(selector)
    }

    css(styles = {}) {
        Object.keys(styles).forEach(style => {
            this.$el.style[style] = styles[style]
        })
    }

    getStyles(arr = []) {
        return arr.reduce((obj, style) => {
            obj[style] = this.$el.style[style]
            return obj
        }, {})
    }

    closest(selector) {
        return $(this.$el.closest(selector))
    }

    getCoords() {
        return this.$el.getBoundingClientRect()
    }
}

export function $(selector) {
    return new Dom(selector)
}

$.create = (tag, classes) => {
    const $el = document.createElement(tag)
    if (classes) {
        $el.classList.add(classes)
    }
    return $($el)
}
