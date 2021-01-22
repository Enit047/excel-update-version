import {Page} from '@core/Page';
import {createStore} from '@core/createSrore';
import {rootReducer} from '@/redux/rootReducer';
import {debounce, storage} from '@core/utils';
import {tableName} from '@/constants';
import {Header} from '@/components/Header/Header';
import {Excel} from '@/components/Excel/Excel';
import {Toolbar} from '@/components/Toolbar/Toolbar';
import {Formula} from '@/components/Formula/Formula';
import {Table} from '@/components/Table/Table';

function excelState(param) {
    return 'excel:' + param
}

export class ExcelPage extends Page {
    getRoot() {
        const param = this.param ? this.param : Date.now().toString()
        const initState = storage(excelState(param)) ? storage(excelState(param)) : {
            colState: {},
            rowState: {},
            dataState: {},
            stylesState: {},
            currentText: '',
            currentStyles: {},
            nameOfFile: tableName,
            timeofCreation: Date.now()
        }
        const store = createStore(rootReducer, initState)
        
        const storeChanged = debounce(state => {
            storage(excelState(param), state)
        }, 500)
        
        store.subscribe(storeChanged)
        
        this.excel = new Excel({
            components: [Header, Toolbar, Formula, Table],
            store
        })
        
        return this.excel.getRoot()
    }

    afterRender() {
        this.excel.render()
    }

    destroy() {
        this.excel.destroy()
    }
}
