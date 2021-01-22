import './scss/index.scss'
import {Router} from '@core/Routing/Router';
import {DashboardPage} from '@/pages/DashbordPage';
import {ExcelPage} from '@/pages/ExcelPage';

new Router('#app', {
    dashboard: DashboardPage,
    excel: ExcelPage
})
