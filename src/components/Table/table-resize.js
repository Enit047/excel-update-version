import {$} from '@core/Dom'

export function tableResizeFun(eve, $root) {
    const typeResize = eve.target.dataset.resize
    const $resizer = $(eve.target)
    const $parent = $resizer.closest('[data-type="resizable"]')
    const coords = $parent.getCoords()
    let coordsVal

    $resizer.css(typeResize === 'col' ? { 
        opacity: 1,
        bottom: '-5000px'
    } : { opacity: 1, right: '-5000px' })

    document.onmousemove = e => {
        if (typeResize === 'col') {
            const delta = e.pageX - coords.right
            coordsVal = coords.width + delta + 'px'
            $resizer.css({ right: -delta + 'px' })
        } else {
            const delta = e.pageY - coords.bottom
            coordsVal = coords.height + delta + 'px'
            $resizer.css({ bottom: -delta + 'px' })
        }
    }

    document.onmouseup = e => {
        document.onmousemove = null
        document.onmouseup = null

        if (typeResize === 'col') {
            $root.findAll(`[data-col="${$parent.data.col}"]`).forEach(el => {
                el.style.width = coordsVal
            })
        } else {
            $parent.css({
                height: coordsVal
            })
        }

        $resizer.css(typeResize === 'col' ? { 
            opacity: 0,
            bottom: '0',
            right: '0'
        } : {opacity: 0, bottom: '-1px'})
    }
}
