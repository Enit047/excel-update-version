import {Page} from '@core/Page';
import {$} from '@core/Dom';
import {getListOfTables} from '@/pages/dashbord.functions';

export class DashboardPage extends Page {
    getRoot() {
        const id = Date.now().toString()
        const dashboard = $.create('div', 'db').html(`
            <div class="db__header">
                <h1>Dashboard excel</h1>
            </div>

            <div class="db__new">
                <div class="db__view">
                    <a href="#excel/${id}" class="db__create">New table</a>
                </div>
            </div>

            ${getListOfTables()}
        `)

        return dashboard
    }
}
