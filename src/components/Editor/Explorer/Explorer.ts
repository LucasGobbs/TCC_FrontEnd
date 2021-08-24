import type { Tab } from "../TabBar/TabBar"

export enum ItemType {
    File, Folder
}
export class Root {
    public selected: Item = null
    constructor(public folders: Item){}
    public selectFile(file: Item): this {
        this.selected = file
        this.folders.selectFile(file)
        return this
    }
}
export class Item {
    public type: ItemType

    public children: Item[]
    public expanded: boolean = false
    public content: string
    
    constructor(public name: string){}
    public folder(children: Item[]): this{
        this.children = children
        this.type = ItemType.Folder
        return this
    }
    public file(content: string): this{
        this.content = content
        this.type = ItemType.File
        return this
    }
    public isFolder(): boolean {
        return this.type == ItemType.Folder
    }
    public isFile(): boolean {
        return this.type == ItemType.File
    }
    public equal(item: Item): Boolean {
        if(this.type == ItemType.File){
            return ((item.type == ItemType.File) &&
                    (this.name == item.name) &&
                    (this.content == item.content))
        } 
        return ((item.type == ItemType.Folder) &&
                (this.name == item.name) &&
                (this.children == item.children))
        
        
    }
    static fromTab(tab: Tab): Item{
        return new Item(tab.name).file(tab.content)
    }
    public selectFile(item: Item){
        // Percorre recursivamente os arquivos
        // Se achar o arquivo selecionado Marca a propriedade expanded como true
        // E marca todos os outros arquivos como false
        if(this.equal(item)){
            this.expanded = true
        }
        else{
            if(this.isFile()){
                this.expanded = false
            }
        }
        //console.log(this.name, !this.children, this.children.length < 1 )
        if(!this.children){return;}
        if(this.children.length < 1){return;}
        for(let child of this.children){
            child.selectFile(item)
        }
    }
}

export const Folder = (name: string, children: Item[]): Item => {
    return new Item(name).folder(children)
}
export const File = (name: string, content: string): Item => {
    return new Item(name).file(content)
}
export const default_folder = Folder("src",[
    Folder("js",[
        File("hello.js",
`class Animal {
    constructor(){}
    come(){ console.log("O Animal está Comendo")}
    deita(){ console.log("O Animal está Deitando")}
}
class Cachorro extends Animal {
    constructor(){
            super()
    }
    deita(){ console.log("O Cachorro está Deitando") }
}

const c = new Cachorro()
c.come()
c.deita()`
        ),
        File("b.js","let b = 2"),
        File("c.js","let c = 2"),
        Folder("nested_js",[
            File("d.js","let d = 2;"),
            File("e.js","let e = 2"),
            File("f.js","let f = 2"),
            Folder("second_nested_js",[
                File("g.js","let g = 2;"),
                File("h.js","let h = 2"),
                File("i.js","let i = 2"),
            ])
        ])
    ]),
    Folder("go",[
        File("a.go","let a = 2"),
        File("b.go","let b = 2"),
        File("c.go","let c = 2"),
    ]),
    Folder("css",[
        File("a.css","let a = 2"),
        File("b.css","let b = 2"),
        File("c.css","let c = 2"),
    ]),
    Folder("java",[
        File("a.java","let a = 2"),
        File("b.java","let b = 2"),
        File("c.java","let c = 2"),
    ]),
    Folder("python",[
        File("a.py","let a = 2"),
        File("b.py","let b = 2"),
        File("c.py","let c = 2"),
    ]),
    File("a.cpp","let a = 2"),
    File("b.cpp","let b = 2"),
    File("c.cpp","let c = 2"),
])
