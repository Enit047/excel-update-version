export class LogicTable {
    static _selected = 'selected'
    constructor() {
        this.group = []
        this.current = null
    }

    get ids() {
        return this.group.map($el => $el.id())
    }

    select($el) {
        this.clear()
        this.group.push($el)
        this.current = $el
        $el.addClass(LogicTable._selected)
        $el.focus()
    }

    applyStyles(style) {
        this.group.forEach(el => el.css(style))
    }

    clear() {
        this.group.forEach(el => el.removeClass(LogicTable._selected))
        this.group = []
    }

    selectGroup($current, group) {
        this.clear()
        this.group = group
        this.group.forEach(el => el.addClass(LogicTable._selected))
    }
}
