import {APPLY_STYLES, CHANGE_TEXT, CURRENT_STYLES, TABLE_RESIZE_COL, TABLE_RESIZE_ROW, CHANGE_NAME, UPDATE_DATE} from '@/redux/types';

// Actions Creator ===================
export function tableResizeActionCol(data) {
    return {
        type: TABLE_RESIZE_COL,
        data
    }
}

export function tableResizeActionRow(data) {
    return {
        type: TABLE_RESIZE_ROW,
        data
    }
}

export function changeCurrentText(data) {
    return {
        type: CHANGE_TEXT,
        data
    }
}

export function currentStylesAction(data) {
    return {
        type: CURRENT_STYLES,
        data
    }
}

export function applyStylesAction(data) {
    return {
        type: APPLY_STYLES,
        data
    }
}

export function changeName(value) {
    return {
        type: CHANGE_NAME,
        data: {
            value
        }
    }
} 

export function updateDate() {
    return {
        type: UPDATE_DATE,
    }
}
