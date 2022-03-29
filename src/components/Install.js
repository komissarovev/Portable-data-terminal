import {Dom} from '/src/Dom.js'

export class Install extends Dom {
    constructor() {
        const html = `
        <div class='row mb-5'>
            <div class='col-sm-3'>
                <button type="button" id="button_back_menu4" class="btn btn-warning btn-back">
                    <h1 class="display-4">Назад</h1>
                </button>
            </div>
            <div class='col-sm-9 text-left'>
                <h1 class="display-3">Настройки</h1>
            </div>
        </div> 
        
        <div class="form-group">
            <H4>Версия TSD-KE: 1.0.24</H4> 
            <H4><a href="https://infostart.ru/public/1507241/">Статья по проекту на infostart.ru</a></H4>  
            <label class="label-file">Выберите csv или json файл</label>
            <input type="file" id="button_file" class="form-control-file button_file" name="file" accept="text/plain,.csv">
            <label class="label-file">Шаблон csv файла(разделитель ";")</label>
            <div class='row'>
                <img src="/icons/tab.png" class="float-left img-shablon">    
            </div>
        </div> 
        <div class='row mb-1'>
            <div class='col text-center'>
                <button type="button" id="button_get_json" class="btn btn-warning btn-block btn-menu">
                    <h1 class="display-4">Получить json с номенклатурой</h1>
                </button>
            </div>
        </div>
        `
        super(html) 
    }
    init() {
        const button = {
            button_back_menu4 : document.getElementById('button_back_menu4'),
            button_file : document.getElementById('button_file'),
            button_get_json : document.getElementById('button_get_json')
        }
        this.button = []
        this.button.push(button)
        this.hide()
    }
    readSingleFile(file,app) {
        if (!file) {
            return;
        }
        app.fileNameLoad = file.name.replace(/.csv/g, '').replace(/.txt/g, '')
        localStorage.setItem("fileNameLoad",app.fileNameLoad)

        var reader = new FileReader();
        reader.onload = function(e) {  
            let contents = e.target.result;
            let product = []
            if (contents.charAt(0)==='[') {
                product = JSON.parse(contents)
            } else {
                const arrContents = contents.split('\r')
                
                arrContents.forEach(el => { 
                    const arr1 = el.replace('\n','').split(';') 
                    product.push({
                        barcode : `${arr1[3]}`,
                        name : `${arr1[1]} ${arr1[2]} арт.${arr1[0]}` 
                    })
                });
            } 
            
            app.product = product
            app.components.nomenklatura.wasRendering = false
            
            localStorage.setItem("product",JSON.stringify(product))
            alert('Номенклатура загружена!')
        };
        reader.readAsText(file);
    }
}
