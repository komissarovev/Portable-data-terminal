export class Dom {
    constructor(html) {
        const appNode = document.querySelector('.app')
        const node = document.createElement('div')
        appNode.appendChild(node)
        this.node = node
        this.html = html
        this.created = false
        this.display = undefined
        this.button = []
        this.wasRendering = false
    }
    static getNameClass() {
        return / [\w]+/.exec(this.toString())[0].trim().toLowerCase()
    } 

    show(){
        if(!this.created) {
            this.node.innerHTML = this.html
            this.created = true
        }else{
            this.node.classList.remove('not-veiw')
        }
        return this.constructor.getNameClass()
    }

    hide(){
        this.node.classList.add('not-veiw')
    }
    
}


export function sortDescById(arr) {
    arr.sort((a, b) =>  b.id - a.id);
}