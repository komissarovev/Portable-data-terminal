import {Dom} from '/src/Dom.js'

export class Nomenklatura extends Dom {
    constructor() {
        const html = `
        <div class='row mb-1 sticky-top'>
            <div class='col'>
                <button type="button" id="button_back_menu3" class="btn btn-warning btn-back">
                    <h1 class="display-4">Назад</h1>
                </button>
            </div>
        </div> 
        <div id="table2">
        </div> 
        `
        super(html) 
    }
    init() {
        const button = {
            button_back_menu3 : document.getElementById('button_back_menu3')
        }
        this.button = []
        this.button.push(button)
        this.hide()
        this.display = document.getElementById('table2')
    }
    rendering(scan){ 
        if (!this.wasRendering) {
            // let table = ''  
            // for (let el in scan) {
            //     table += getStroka(scan[el],el)
            // }
            //this.display.innerHTML = table
            this.display.innerText = JSON.stringify(scan,null,1)
            this.wasRendering = true
        }    
    }
}

function getStroka(name1,barcode){
    return `
                <div class="card bg-warning">
                    <div class="card bg-light">
                        <div class="card-body ">
                            <div class="row ">
                                <div class="col-sm-12 text-left text-success"><h1 class="display-4">${name1}</h1></div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12 text-left"><h1 class="display-4">${barcode}</h1></div>
                            </div>
                        </div>
                    </div> 
                </div>
        `
}