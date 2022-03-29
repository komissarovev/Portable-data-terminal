import {beep} from '/src/Audio.js'

export class App {
    constructor() {
        this.components = {}
        this.active = 'menu'
        this.scan = []
        this.product = []
        this.currentDiv = ''
        this.oldValueInput = 1
        this.oldValueCell = ''
        this.currentCell = ''
        this.generatorIdSave = 0
        this.buffer = {
            data1 : {
                code : ''
            },
            data2 : {
                id : '',
                qnt : '',
                target : ''
            },
            data3 : {
                id : '',
                qnt : ''
            }
        }
        this.deleteRaw = 0
        this.fileNameLoad = ''
    }

    set setCurrentCell(val){
        this.currentCell = val;
        localStorage.setItem("currentCell",val)
    }

    init(component) {
        component.show()
        component.init()
        const componentName = component.constructor.getNameClass()
        const Obj = new Object();
        Obj[componentName] = component;
        this.addCompon(Obj)
        this.addListeners(componentName)
    }

    addCompon(obj1){
        this.components = {...this.components, ...obj1}
    }

    initLocalStorage(){
        let raw = localStorage.getItem("scan")
        if (raw === null) {this.scan=[]} else {
            this.scan = JSON.parse(raw)
        }
        raw = localStorage.getItem("product")
        if (raw === null) {this.product=[]} else {
            this.product = JSON.parse(raw)
        } 
        raw = localStorage.getItem("generatorIdSave")
        if (raw === null) {this.generatorIdSave=0} else {
            this.generatorIdSave = JSON.parse(raw)
        }   
        raw = localStorage.getItem("currentCell")
        if (raw === null || raw === '') {this.currentCell=''} else {
            this.currentCell = JSON.parse(raw)
        }
        raw = localStorage.getItem("fileNameLoad")
        if (raw === null || raw === '') {this.fileNameLoad='data_tsd'} else {
            this.fileNameLoad = raw
        }
    }

    clearBuffer(){
        this.buffer = { 
                data1 : {
                    code : ''
                },
                data2 : {
                    id : '',
                    qnt : '',
                    target : ''
                },
                data3 : {
                    id : '',
                    qnt : ''
                }
            }
    }

    addScan(data,dataFull,findName = ''){
        if (findName == '') {
            const product = this.product.filter(item=>item.barcode==data.code)
            if (product.length===0){
                findName = `Не найден`
                beep()
            } else if (product.length===1){
                findName = product[0].name
            } else if (product.length>1){
                beep()
                this.components.inventory_without_quantity.hide()
                this.active = this.components.inventory_select_nomenklatura.show()
                this.components.inventory_select_nomenklatura.rendering(product)
                return
            }
        }

        this.generatorIdSave++
        localStorage.setItem("generatorIdSave",this.generatorIdSave)

        // const lastIndex = this.scan.length-1
        // if ((this.scan.length && data.code===this.scan[lastIndex].barcode &&
        //     this.scan[lastIndex].cell==this.currentCell && findName == '') || 
        //     (this.scan.length && data.code===this.scan[lastIndex].barcode &&
        //     this.scan[lastIndex].cell==this.currentCell && findName != '' &&
        //     findName === this.scan[lastIndex].name)){
    
        //     this.scan[lastIndex].id = this.generatorIdSave  

        //     if (data?.qnt===undefined) {
        //         this.scan[lastIndex].quantity += 1
        //     } else {
        //         this.scan[lastIndex].quantity = data.qnt*1
        //     }
        // }else {
            this.scan.push({
                id : this.generatorIdSave,
                barcode :data.code,
                barcode_full : dataFull,
                name : findName,
                quantity : 1,
                cell : this.currentCell
            })
        //}

        localStorage.setItem("scan",JSON.stringify(this.scan))
    }

    chengeScan(data){
        const item = this.scan.find(el=>el.id==data.id)
        item.quantity = data.qnt*1
        localStorage.setItem("scan",JSON.stringify(this.scan))
    }

    download(name, data, conf=1) {
        const type = 'text/plain'
        let text = ''
        if (conf===1) {
            text = JSON.stringify(data,null,1)
        } else if (conf===2) {
            text = "cell;quantity;barcode;barcode_full;name;sort\r"
            data.forEach(el => {
                text += `\n${el.cell};${el.quantity};${el.barcode};${el.barcode_full};${el.name};${el.id}\r`
            });
        }
        
        const dload = document.createElement("a")
        var file = new Blob([text], {type: type});
        dload.href = URL.createObjectURL(file);
        dload.download = name;
        dload.click()
        dload.remove()
    }

    addListeners(compon) {
        switch (compon) {
            case 'menu': 
                this.components.menu.button[0].button_info_prod.addEventListener('click', (e)=>{ 
                    this.components.menu.hide()
                    this.active = this.components.info_prod.show()
                })
                this.components.menu.button[0].button_inventory.addEventListener('click',(e)=>{
                    this.components.menu.hide()
                    this.active = this.components.inventory.show()
                })
                this.components.menu.button[0].button_nomenklatura.addEventListener('click',(e)=>{
                    this.components.menu.hide()
                    this.active = this.components.nomenklatura.show()
                    this.components.nomenklatura.rendering(this.product)
                })
                this.components.menu.button[0].button_install.addEventListener('click',(e)=>{
                    this.components.menu.hide()
                    this.active = this.components.install.show()
                })
            break;
        
            case 'info_prod': 
                this.components.info_prod.button[0].button_back_menu.addEventListener('click', (e)=>{
                    this.components.info_prod.hide()
                    this.active = this.components.menu.show()
                })
            break;

            case 'inventory': 
                this.components.inventory.button[0].button_back_menu2.addEventListener('click', (e)=>{
                    this.components.inventory.hide()
                    this.active = this.components.menu.show()
                })
                this.components.inventory.button[0].button_without_quantity.addEventListener('click', (e)=>{
                    this.components.inventory.hide()
                    this.active = this.components.inventory_without_quantity.show()
                    this.components.inventory_without_quantity.cellNode.value = this.currentCell
                    if (this.scan.length) {
                        this.components.inventory_without_quantity.rendering(this)
                    } else {
                        this.generatorIdSave = 0
                    }
                })
                this.components.inventory.button[0].button_view_data.addEventListener('click', (e)=>{
                    this.components.inventory.hide()
                    this.active = this.components.inventory_view_data.show()
                    this.components.inventory_view_data.rendering(this.scan)
                })
                this.components.inventory.button[0].button_clear_data.addEventListener('click', (e)=>{
                    this.components.inventory.hide()
                    this.active = this.components.inventory_clear_data.show()
                })
                this.components.inventory.button[0].button_unload_data.addEventListener('click', (e)=>{
                    //this.download('data_tsd.csv',this.scan,2)
                    const dateDownLoad = new Date().toLocaleString("ru-RU").replace(/, /, '_').replace(/:/g, '.')
                    this.download(`out_${this.fileNameLoad}_${dateDownLoad}.csv`,this.scan,2)
                })
            break;

            case 'inventory_without_quantity': 
                this.components.inventory_without_quantity.button[0].button_back_inventory.addEventListener('click', (e)=>{
                    this.components.inventory_without_quantity.hide()
                    this.active = this.components.inventory.show()
                })
                this.components.inventory_without_quantity.display.addEventListener('click', (e)=>{
                    if (e.target.localName === "button" && e.target.classList.contains('btn-delete')) {
                        this.deleteRaw = e.target.dataset.barcode 
                        this.components.inventory_without_quantity.hide()
                        this.active = this.components.inventory_delete_raw.show()
                    } else if (document.activeElement.classList.contains('div-quantity')) {
                        this.oldValueInput = document.activeElement.value
                        document.activeElement.value=''
                        if(document.activeElement.onblur===null) {
                            document.activeElement.onblur = (e) => { 
                                //значит не нажали интер такое значение не сохраняем
                                e.target.value = this.oldValueInput   
                                this.buffer.data2.qnt = ''
                            }
                        }                         
                    }    
                })
                this.components.inventory_without_quantity.cellNode.addEventListener('click', (e)=>{
                    this.oldValueCell = e.target.value
                    e.target.value=''
                    if(e.target.onblur===null) {
                        e.target.onblur = (e) => { 
                            if (e.target.value=='') {
                                e.target.value = this.oldValueCell
                            } 
                            this.currentDiv = ''
                            this.setCurrentCell = e.target.value
                            this.components.inventory_without_quantity.rendering(this)   
                        }
                    }                         
                })
            break;

            case 'inventory_delete_raw': 
                this.components.inventory_delete_raw.button[0].button_delete_raw_no.addEventListener('click', (e)=>{
                    this.components.inventory_delete_raw.hide()
                    this.active = this.components.inventory_without_quantity.show()
                })
                this.components.inventory_delete_raw.button[0].button_delete_raw_yes.addEventListener('click', (e)=>{
                    const index = this.scan.findIndex(nomenk => nomenk.barcode == this.deleteRaw)
                    this.scan.splice(index,1)
                    localStorage.setItem("scan",JSON.stringify(this.scan))
                    this.components.inventory_delete_raw.hide()
                    this.active = this.components.inventory_without_quantity.show()
                    this.components.inventory_without_quantity.rendering(this)
                })
            break;

            case 'inventory_view_data': 
                this.components.inventory_view_data.button[0].button_back_inventory_view_data.addEventListener('click', (e)=>{
                    this.components.inventory_view_data.hide()
                    this.active = this.components.inventory.show()
                })
            break;

            case 'inventory_clear_data': 
                this.components.inventory_clear_data.button[0].button_clear_data_no.addEventListener('click', (e)=>{
                    this.components.inventory_clear_data.hide()
                    this.active = this.components.inventory.show()
                })
                this.components.inventory_clear_data.button[0].button_clear_data_yes.addEventListener('click', (e)=>{
                    this.scan = []
                    localStorage.setItem("scan",JSON.stringify(this.scan))
                    this.setCurrentCell = ''
                    this.components.inventory_without_quantity.display.innerHTML = ''
                    this.components.inventory_clear_data.hide()
                    this.active = this.components.inventory.show()
                })
            break;

            case 'inventory_select_nomenklatura':
                this.components.inventory_select_nomenklatura.display.addEventListener('click', (e)=>{
                    if (e.target.classList.contains('select-nomenk')) {
                        const barcode = e.target.dataset.barcode 
                        this.components.inventory_select_nomenklatura.hide()
                        this.active = this.components.inventory_without_quantity.show()
                        this.addScan({code : barcode},barcode,e.target.dataset.name)
                        this.components.inventory_without_quantity.rendering(this)
                    }
                })
            break;

            case 'nomenklatura': 
                this.components.nomenklatura.button[0].button_back_menu3.addEventListener('click', (e)=>{
                    this.components.nomenklatura.hide()
                    this.active = this.components.menu.show()
                })
            break;

            case 'install': 
                this.components.install.button[0].button_back_menu4.addEventListener('click', (e)=>{
                    this.components.install.hide()
                    this.active = this.components.menu.show()
                })
                this.components.install.button[0].button_file.addEventListener('change', (e)=>{
                    const file = e.target.files[0]
                    this.components.install.readSingleFile(file,this)
                },false)
                this.components.install.button[0].button_get_json.addEventListener('click', (e)=>{
                    this.download('nomenklatura_json.txt',this.product)
                },false)
            break;
            
        } 
    }
}

