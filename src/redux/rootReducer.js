import {APPLY_STYLES, CHANGE_TEXT, CURRENT_STYLES, TABLE_RESIZE_COL, TABLE_RESIZE_ROW, CHANGE_NAME} from '@/redux/types';

// Pure Function (x Side Effects)
export function rootReducer(state, action) {
    let preState;
    switch (action.type) {
        case TABLE_RESIZE_COL:
            preState = {...state.colState, ...action.data}
            return {...state, colState: preState}
        case TABLE_RESIZE_ROW:
            preState = {...state.rowState, ...action.data}
            return {...state, rowState: preState}
        case CHANGE_TEXT:
            preState = {...state.dataState} || {}
            preState[action.data.id] = action.data.text
            return {...state, currentText: action.data.text, dataState: preState}
        case CURRENT_STYLES:
            return {...state, currentStyles: action.data}
        case APPLY_STYLES:
            preState = state['stylesState'] || {}
            action.data.ids.forEach(id => {
                preState[id] = {...preState[id], ...action.data.value}
            })
            return {
                ...state,
                stylesState: preState,
                currentStyles: {...state['currentStyles'], ...action.data.value}
            }
        case CHANGE_NAME:    
            return {
                ...state,
                nameOfFile: action.data.value 
            }
        default: return state
    }
}
