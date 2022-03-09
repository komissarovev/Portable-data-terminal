import {Dom} from '/src/Dom.js'

export class Info_prod extends Dom {
    constructor() {
        const html = `
        <div class='row mb-1 sticky-top'>
            <div class='col-sm-3'>
                <button type="button" id="button_back_menu" class="btn btn-warning btn-back">
                    <h1 class="display-4">Назад</h1>
                </button>
            </div>
            <div class='col-sm-9 text-left'>
                <h1 class="display-3">Отсканируйте товар...</h1>
            </div>
        </div>
        <div class="card bg-light">
            <div class="card-body">
                <div class="row ">
                    <div class="col text-left">
                        <h1 class="display-3" id="display_info_prod"></h1>
                    </div>
                </div>
            </div>
        </div> 
        `
        super(html) 
    }
    init() {
        const button = {
            button_back_menu : document.getElementById('button_back_menu'),
        }
        this.button = []
        this.button.push(button)
        this.hide()
        this.display = document.getElementById('display_info_prod')
    }
    rendering(app,code) {
        let name1 = ''
        const product = app.product.filter(item=>item.barcode==code)
        if (product.length===0){
            name1 = code + `
            Не найден`
        } {
            product.forEach((item)=>{
                name1 += `
                ${code}` + `
                ${item.name}` 
            })
        } 

        this.display.innerText = name1
    }
}
