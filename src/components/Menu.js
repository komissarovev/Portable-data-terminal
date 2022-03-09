import {Dom} from '/src/Dom.js'

export class Menu extends Dom {
    constructor() {
        const html = `
        <div class='row mb-1'>
            <img src="/icons/tsd.png" class="mx-auto d-block">    
        </div>
        <div class='row mb-1'>
            <div class='col text-center'>
                <button type="button" id="button_info_prod" class="btn btn-warning btn-block btn-menu">
                <h1 class="display-4">Информация о товаре</h1>
                </button>
            </div>
        </div>
        <div class='row mb-1'>
            <div class='col text-center'>
                <button type="button" id="button_inventory" class="btn btn-warning btn-block btn-menu">
                    <h1 class="display-4">Инвентаризация</h1>
                </button>
            </div>
        </div>
        <div class='row mb-1'>
            <div class='col text-center'>
                <button type="button" id="button_nomenklatura" class="btn btn-warning btn-block btn-menu">
                    <h1 class="display-4">Номенклатура</h1>
                </button>
            </div>
        </div>
        <div class='row mb-1'>
            <div class='col text-center'>
                <button type="button" id="button_install" class="btn btn-warning btn-block btn-menu">
                    <h1 class="display-4">Настройки</h1>
                </button>
            </div>
        </div>  	  
        `
        super(html) 
    }
    init() {
        const button = {
            button_info_prod : document.getElementById('button_info_prod'),
            button_inventory : document.getElementById('button_inventory'),
            button_nomenklatura : document.getElementById('button_nomenklatura'),
            button_install : document.getElementById('button_install')
        }
        this.button = []
        this.button.push(button)
    }
}