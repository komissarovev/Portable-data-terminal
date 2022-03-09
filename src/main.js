import {App} from '/src/App.js'
import {Menu} from '/src/components/Menu.js'
import {Info_prod} from '/src/components/Info_prod.js'
import {Inventory,Inventory_without_quantity,
    Inventory_clear_data,Inventory_view_data,
    Inventory_delete_raw,Inventory_select_nomenklatura} from '/src/components/Inventory.js'
import {Install} from '/src/components/Install.js'
import {Nomenklatura} from '/src/components/Nomenklatura.js'
import {BarcodeScaner} from '/src/components/BarcodeScaner.js'


window.addEventListener('load', async () => {
    if ('serviceWorker' in navigator) {
        try {
            const reg = await navigator.serviceWorker.register('sw.js')
            console.log('Service worker register success', reg)
        } catch (e) {
            console.log('Service worker register fail')
        }
    }

    await loadApp()
})


async function loadApp() {
    const app = new App()

    app.init(new Menu())
    app.init(new Info_prod())
    app.init(new Inventory())
    app.init(new Inventory_without_quantity())
    app.init(new Inventory_delete_raw())
    app.init(new Inventory_view_data())
    app.init(new Nomenklatura())
    app.init(new Install())
    app.init(new Inventory_clear_data())
    app.init(new Inventory_select_nomenklatura())

    app.initLocalStorage()

    const barcodeScaner = new BarcodeScaner(app)
    barcodeScaner.initialize()
}



