import type { Item } from "../Explorer/Explorer";

export class Tab {
    constructor(public name: string, public content: string){}
    static fromItem(item: Item): Tab {
        return new Tab(item.name, item.content)
    }
    equal(other: Tab):boolean{
        return ((this.name==other.name)&&(this.content==other.content))
    }
}

export class Tabs {
    constructor(public items: Tab[], public selected: number = 0){}
    
    getSelected(): Tab{
        return this.items[this.selected]
    }
    alreadyOpen(tab: Tab): Boolean{
        return this.items.filter((t)=>{return tab.equal(t)}).length > 0
    }
    getIndex(tab: Tab): number{
        let index = 0
        for(let _tab of this.items){
            if (tab.equal(_tab)){
                return index
            }
            index++
        }
        return -1
    }
    add(tab: Tab): this{
        this.items.push(tab)
        this.selected = this.items.length - 1;
        return this;
    }
    remove(index: number): this{
        // Se é a primeira tab o indice continua 0, se não for vai pra tab anterior
        // console.log(`First length: ${this.items.length} | index ${index} | selected ${this.selected}`)
        if(index != 0 &&index==this.selected){
            console.log('entrou')
            if(index == this.items.length-1){
                this.selected = index-1
            } else {
                this.selected = index
            }
        } else {
            if(this.selected == this.items.length-1){
                this.selected = this.selected-1
            }
        }
        
        // console.log('tst', this.selected)
        this.items.splice(index, 1);

        return this;
    }
    select(index: number): this{
        this.selected = index;
        return this;
    }
}