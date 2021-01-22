function getStorageExcel() {
    const arrTable = []
    for (let i = 0; i < localStorage.length; i++) {
        if (!localStorage.key(i).includes('excel')) {
            continue
        }
        arrTable.push(localStorage.key(i))
    }
    return arrTable
}

export function getListOfTables() {
    const excelTablesNames = getStorageExcel()
    const excelTables = excelTablesNames.map(name => ({...JSON.parse(localStorage.getItem(name)), id: name.split(':')[1]}))

    if (!excelTables.length) {
        return `<p class="db__error">List is empty...</p>`
    }

    return `
        <div class="db__tables db__view">

            <div class="db__list-header">
                <span>Name</span>
                <span>Time</span>
            </div>

            <ul class="list">

                ${excelTables.map(listItemHTML).join('')}

            </ul>

        </div>
    `
}

function listItemHTML({nameOfFile, id, timeofCreation}) {
    const date = new Date(timeofCreation).toLocaleDateString()
    const time = new Date(timeofCreation).toLocaleTimeString()
    return `
        <li class="list__item">
            <a href="#excel/${id}" class="list__name">${nameOfFile}</a>
            <time class="list__date">${date + ' ' + time}</time>
        </li> 
   `
}
