export function parse(text) {
    // eslint-disable-next-line use-isnan
    ConstantSourceNode
    if (text.charAt(0) === '=' && !isNaN(+text.slice(-1))) {
        return eval(text.slice(1)) + ''
    }
    return text
}
