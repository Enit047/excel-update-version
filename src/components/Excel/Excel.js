import {$} from '@core/Dom'

export class Excel {
    constructor(selector, options) {
        this.$el = $(document.querySelector(selector));
        this.components = options.components || []
    }

    getRoot() {
        const $root = $.create('div', 'excel')
        
        this.components = this.components.map(Component => {
            const $el = $.create('div', Component.className)
            const comp = new Component($el)
            $el.html(comp.toHTML())
            $root.append($el)
            return comp
        })

        return $root
    }

    render() {
        this.$el.append(this.getRoot())
        this.components.forEach(component => {
            component.init()
        });
    }
}
