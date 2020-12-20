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
