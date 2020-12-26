export class LogicTable {
    static _selected = 'selected'
    constructor() {
        this.group = []
        this.current = null
    }

    select($el) {
        this.clear()
        this.group.push($el)
        this.current = $el
        $el.addClass(LogicTable._selected)
        $el.focus()
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
