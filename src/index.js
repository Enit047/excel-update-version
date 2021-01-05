import { Excel } from './components/Excel/Excel'
import { Formula } from './components/Formula/Formula'
import { Header } from './components/Header/Header'
import { Table } from './components/Table/Table'
import { Toolbar } from './components/Toolbar/Toolbar'
import { rootReducer } from '@/redux/rootReducer'
import {createStore} from '@core/createSrore';
import {storage} from '@core/utils';
import {tableName} from '@/constants';
import './scss/index.scss'
import { debounce } from './core/utils'

const initState = storage('excel-app-state') ? storage('excel-app-state') : {
    colState: {},
    rowState: {},
    dataState: {},
    stylesState: {},
    currentText: '',
    currentStyles: {},
    nameOfFile: tableName
}
const store = createStore(rootReducer, initState)

const storeChanged = debounce(state => {
    console.log('State APP: ', state)
    storage('excel-app-state', state)
}, 500)

store.subscribe(storeChanged)

const excel = new Excel('#app', {
    components: [Header, Toolbar, Formula, Table],
    store
})

excel.render()
