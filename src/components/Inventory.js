import {Dom, sortDescById} from '/src/Dom.js'

export class Inventory extends Dom {
    constructor() {
        const html = `
        <div class='row mb-1 '>
            <div class='col-sm-3'>
                <button type="button" id="button_back_menu2" class="btn btn-warning btn-back">
                    <h1 class="display-4">Назад</h1>
                </button>
            </div>
            <div class='col-sm-9 text-left'>
                <h1 class="display-3">Инвентаризация</h1>
            </div>
        </div>
        <div class='row mb-1'>
            <div class='col text-center'>
                <button type="button" id="button_without_quantity" class="btn btn-warning btn-block btn-menu">
                <h1 class="display-4">Вводить данные</h1>
                </button>
            </div>
        </div>
        <div class='row mb-1'>
            <div class='col text-center'>
                <button type="button" id="button_view_data" class="btn btn-warning btn-block btn-menu">
                    <h1 class="display-4">Просмотреть данные</h1>
                </button>
            </div>
        </div>
        <div class='row mb-1'>
            <div class='col text-center'>
                <button type="button" id="button_clear_data" class="btn btn-warning btn-block btn-menu">
                    <h1 class="display-4">Очистить данные</h1>
                </button>
            </div>
        </div> 
        <div class='row mb-1'>
            <div class='col text-center'>
                <button type="button" id="button_unload_data" class="btn btn-warning btn-block btn-menu">
                    <h1 class="display-4">Выгрузить данные</h1>
                </button>
            </div>
        </div> 	  
        `
        super(html) 
    }
    init() {
        const button = {
            button_back_menu2 : document.getElementById('button_back_menu2'),
            button_without_quantity : document.getElementById('button_without_quantity'),
            button_view_data : document.getElementById('button_view_data'),
            button_clear_data : document.getElementById('button_clear_data'),
            button_unload_data : document.getElementById('button_unload_data')
        }
        this.button = []
        this.button.push(button)
        this.hide()
    }
    
}

export class Inventory_without_quantity extends Dom {
    constructor() {
        const html = `
        <div class='row mb-1 sticky-top'>
            <div class='col-sm-3'>
                <button type="button" id="button_back_inventory" class="btn btn-warning btn-back">
                    <h1 class="display-4">Назад</h1>
                </button>
            </div>
            <div class='col-sm-6 text-left'>
                <label for="inventory_without_quantity_barcodeNode"><h1 class="display-4">ШК</h1></label>
                <input type="number" id="inventory_without_quantity_barcodeNode" class="form-control div_shtrih" value="" >
            </div>
            <div class='col-sm-3 div_cell'>
                <label for="inventory_without_quantity_cell"><h1 class="display-4">Ячейка</h1></label>
                <input type="number" id="inventory_without_quantity_cell" class="form-control div_cell" value="" >
            </div>
        </div> 
        <div id="table_inventory_without_quantity">
        </div> 
        `
        super(html)
        this.cellNode = ''
        this.barcodeNode = null
        this.lastQntNode = null
    }

    init() {
        const button = {
            button_back_inventory : document.getElementById('button_back_inventory')
        }
        this.button = []
        this.button.push(button)
        this.hide()
        this.display = document.getElementById('table_inventory_without_quantity')
        this.cellNode = document.getElementById('inventory_without_quantity_cell')
        this.barcodeNode = document.getElementById('inventory_without_quantity_barcodeNode')
    }

    rendering(app){ 
        let table = ''  
        let scan1 = app.scan.slice()
        sortDescById(scan1)
        scan1 = scan1.filter(el=>el.cell==app.currentCell)
        for (let index in scan1) {
            table += this.getStroka(scan1[index])
        }
        this.display.innerHTML = table
        this.lastQntNode = document.querySelector('input.div-quantity')
    }

    getStroka(el){
        return `
            <div class='d-flex'>
                <div class='flex-fill'>
                    <div class="card bg-warning">
                        <div class="card bg-light">
                            <div class="card-body ">
                                <div class="row ">
                                    <div class="col-sm-9 text-left text-success">
                                        <h1 class="display-4">${el.name}</h1>
                                    </div>
                                    <div class="col-sm-3 text-primary div-quantity">
                                        <h1 class="display-4 ">Яч:${el.cell}</h1>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-9 text-left"><h1 class="display-4">${el.barcode}</h1></div>
                                    <div class="col-sm-3 text-center div-quantity">
                                        <input type="number" class="form-control text-center div-quantity" value="${el.quantity}" 
                                        data-barcode="${el.barcode}" data-id="${el.id}">
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
                    <button type="button" class="btn btn-danger btn-delete" data-barcode="${el.barcode}">
                        Х
                    </button>  
            </div>
            `
    }
}



export class Inventory_view_data extends Dom {
    constructor() {
        const html = `
        <div class='row mb-1 sticky-top'>
            <div class='col'>
                <button type="button" id="button_back_inventory_view_data" class="btn btn-warning btn-back">
                    <h1 class="display-4">Назад</h1>
                </button>
            </div>
        </div> 
        <div id="table_inventory_view_data">
        </div> 
        `
        super(html) 
    }
    init() {
        const button = {
            button_back_inventory_view_data : document.getElementById('button_back_inventory_view_data')
        }
        this.button = []
        this.button.push(button)
        this.hide()
        this.display = document.getElementById('table_inventory_view_data')
    }
    rendering(scan){ 
        let table = ''  
        for (let el in scan) {
            table += this.getStroka(scan[el])
        }
        this.display.innerHTML = table
    }

    getStroka(el){
        return `
        <div class="card bg-warning">
            <div class="card bg-light">
                <div class="card-body ">
                    <div class="row ">
                        <div class="col-sm-9 text-left text-success">
                        <h1 class="display-4">${el.name}</h1>
                    </div>
                    <div class="col-sm-3 text-left text-primary div-quantity">
                        <h1 class="display-4 ">Яч:${el.cell}</h1>
                    </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-9 text-left"><h1 class="display-4">${el.barcode}</h1></div>
                        <div class="col-sm-3 text-center text-danger"><h1 class="display-4">${el.quantity}</h1></div>
                    </div>
                </div>
            </div> 
        </div>
        `
    }
}



export class Inventory_clear_data extends Dom {
    constructor() {
        const html = `
        <h1 class="display-3">Очистить данные?</h1>
        <div class='row mb-1'>
            <div class='col text-center'>
                <button type="button" id="button_clear_data_no" class="btn btn-warning btn-block btn-menu">
                <h1 class="display-4">Нет</h1>
                </button>
            </div>
        </div>
        <div class='row mb-1'>
            <div class='col text-center'>
                <button type="button" id="button_clear_data_yes" class="btn btn-warning btn-block btn-menu">
                    <h1 class="display-4">Да</h1>
                </button>
            </div>
        </div> 
        `
        super(html) 
    }
    init() {
        const button = {
            button_clear_data_no : document.getElementById('button_clear_data_no'),
            button_clear_data_yes : document.getElementById('button_clear_data_yes')
        }
        this.button = []
        this.button.push(button)
        this.hide()
    }
}


export class Inventory_delete_raw extends Dom {
    constructor() {
        const html = `
        <h1 class="display-3">Удалить строку?</h1>
        <div class='row mb-1'>
            <div class='col text-center'>
                <button type="button" id="button_delete_raw_no" class="btn btn-warning btn-block btn-menu">
                <h1 class="display-4">Нет</h1>
                </button>
            </div>
        </div>
        <div class='row mb-1'>
            <div class='col text-center'>
                <button type="button" id="button_delete_raw_yes" class="btn btn-warning btn-block btn-menu">
                    <h1 class="display-4">Да</h1>
                </button>
            </div>
        </div> 
        `
        super(html) 
    }
    init() {
        const button = {
            button_delete_raw_no : document.getElementById('button_delete_raw_no'),
            button_delete_raw_yes : document.getElementById('button_delete_raw_yes')
        }
        this.button = []
        this.button.push(button)
        this.hide()
    }
}



export class Inventory_select_nomenklatura extends Dom {
    constructor() {
        const html = `
        <h1 class="display-3">Выберите номенклатуру:</h1>
        <br>
        <div id="button_inventory_select_nomenklatura">
        </div> 
        `
        super(html) 
    }
    init() {
        this.hide()
        this.display = document.getElementById('button_inventory_select_nomenklatura')
    }
    rendering(product){ 
        let button1 = ''  
        for (let el in product) {
            button1 += this.getStroka(product[el])
        }
        this.display.innerHTML = `<h1 class="display-4">
        ШК: ${product[0].barcode}</h1>
        ` + button1
    }
    getStroka(el){
        return `
        <div class="card bg-info mb-4">
            <div class="card bg-light">
                <div class="card-body ">
                    <div class="row ">
                        <div class="col-sm-12 text-left text-dark">
                            <h1 class="display-4 select-nomenk" data-name="${el.name}" data-barcode="${el.barcode}">
                                ${el.name}
                            </h1>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
        `
    }
}
