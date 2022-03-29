export class BarcodeScaner {
    constructor(app) {
        this.app = app
        this.lastTimeKeyPress = 0
        this.lastDifferenceTimeKeyPress = 0
        this.delayKeypress = 80
    }
    initialize = () => {
        document.addEventListener('keypress', event => {
            let data = this.app.buffer
        
            if (event.key !== 'Enter') { // barcode ends with enter -key
                
                const differenceTimeKeyPress = Date.now()-this.lastTimeKeyPress
                this.lastTimeKeyPress = Date.now()

                if (event.target.classList.contains('div-quantity')) {
                    data.data2.qnt += event.key
                    this.app.buffer.data2.qnt = data.data2.qnt
                    this.app.buffer.data2.id = event.target.dataset.id
                    this.app.buffer.data2.target = event.target
                    this.app.currentDiv = 'quantity'
                } else if (event.target.classList.contains('div_cell')) {
                    this.app.currentDiv = 'cell'
                } else if (event.target.classList.contains('div_shtrih')) {
                    this.app.currentDiv = 'shtrih'    
                }else {
                    if (differenceTimeKeyPress>=this.delayKeypress && this.app.scan.length && 
                        this.app.components.inventory_without_quantity.lastQntNode!==null) {
                        data.data3.qnt += event.key
                        this.app.buffer.data3.qnt = data.data3.qnt
                        this.app.buffer.data3.id = this.app.generatorIdSave
                        this.app.components.inventory_without_quantity.lastQntNode.value = data.data3.qnt
                    }else if (differenceTimeKeyPress<this.delayKeypress && this.lastDifferenceTimeKeyPress>=this.delayKeypress && data.data3.qnt.length) {
                        //сначала вводили количество а потом начали сканировать надо удалить первый символ штрих-кода из количества
                        data.data3.qnt = data.data3.qnt.slice(0, -1)
                    }   
                    
                    data.data1.code += event.key
                    this.app.buffer.data1.code = data.data1.code
                    this.lastDifferenceTimeKeyPress = differenceTimeKeyPress
                        //Оставить для отладки. Выводит штрих-код в инпут
                        // if (data.data1.code.length < 15) {
                        //     if (!isNaN(data.data1.code*1)) {    
                        //         this.app.components.inventory_without_quantity.barcodeNode.value = data.data1.code
                        //     }    
                        // } 
                        
                }
            } else {
                
                this.app.clearBuffer()
            
                if (this.app.currentDiv === 'quantity' && (isNaN(data.data2.qnt*1)|| data.data2.qnt.length>10)) {
                    this.app.components.inventory_without_quantity.rendering(this.app)
                    this.app.currentDiv = ''
                    return
                }else if (this.app.currentDiv === 'cell') {
                    event.target.blur()
                    this.app.currentDiv = ''
                    return
                }else if (this.app.currentDiv === 'shtrih') {
                    data.data1.code = event.target.value 
                    event.target.blur()
                }
        
                this.app.components.inventory_without_quantity.barcodeNode.value = ''
        
                //Перенес ниже т.к. ниже отсекаю лишнее
                // let dataFull = data.data1.code
                // if (data.data1.code!=undefined && data.data1.code.length>25){
                //     data.data1.code = data.data1.code.substring(2,16) + data.data1.code.substring(18,31)
                // }
                switch (this.app.active) {
                    case 'info_prod': 
                        if (data.data1.code!=undefined && data.data1.code.length>25){
                            data.data1.code = data.data1.code.substring(2,16) + data.data1.code.substring(18,31)
                        }
                        this.app.components.info_prod.rendering(this.app,data.data1.code)
                    break; 
        
                    case 'inventory_without_quantity':
                        let addScan = false
                        if (this.app.currentDiv=='' && !isNaN(data.data3.qnt*1) && data.data3.qnt>0) {
                            this.app.chengeScan(data.data3)
                            data.data1.code = data.data1.code.slice(data.data3.qnt.length) 
                        }

                        let dataFull = data.data1.code
                        if (data.data1.code!=undefined && data.data1.code.length>25){
                            data.data1.code = data.data1.code.substring(2,16) + data.data1.code.substring(18,31)
                        }

                        if (data.data2.qnt.length && data.data2.id.length) {
                            //this.app.addScan(data.data2,dataFull)
                            this.app.chengeScan(data.data2)
                            data.data2.target.innerText = data.data2.target.innerText.replace(dataFull,'')
                        }
                        if (data.data1.code!=undefined && data.data1.code.length) {
                            this.app.addScan(data.data1,dataFull)
                            addScan = true
                        }     
                        this.app.components.inventory_without_quantity.rendering(this.app,addScan)
                    break;
                }
                this.app.currentDiv = ''
            }
        })
    }
}
