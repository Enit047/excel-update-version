function createButton(button) {
    const meta = `
        data-type="icon"
        data-value='${JSON.stringify(button.value)}'
    `
    return `
    <div ${meta} class="button ${button.active ? 'active' : ''}">
        <span ${meta} class="material-icons" >
            ${button.icon}
        </span>
    </div>
    `
}

export function createToolbar(s) {
    const configIcons = [
        {
            icon: 'format_align_left',
            active: s['textAlign'] === 'left',
            value: {textAlign: 'left'}
        },
        {
            icon: 'format_align_center',
            active: s['textAlign'] === 'center',
            value: {textAlign: 'center'}
        },
        {
            icon: 'format_align_right',
            active: s['textAlign'] === 'right',
            value: {textAlign: 'right'}
        },
        {
            icon: 'format_bold',
            active: s['fontWeight'] === 'bold',
            value: {fontWeight: s['fontWeight'] === 'bold' ? 'normal' : 'bold'}
        },
        {
            icon: 'format_italic',
            active: s['fontStyle'] === 'italic',
            value: {fontStyle: s['fontStyle'] === 'italic' ? 'normal' : 'italic'}
        },
        {
            icon: 'format_underlined',
            active: s['textDecoration'] === 'underline',
            value: {textDecoration: s['textDecoration'] === 'underline' ? 'none' : 'underline'}
        }
    ]                         
    return configIcons.map(createButton).join('')
}
