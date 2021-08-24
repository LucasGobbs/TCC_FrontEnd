import * as CodeMirror from 'codemirror'
export class User {
    public color: string
    public name: string
    private cursor: CodeMirror.TextMarker
    private pos: CodeMirror.Position
    public visible: boolean = true

    constructor(name: string){
        this.name = name;
    }
    toggleCursor(editor: CodeMirror.Editor){
        if(!this.cursor){return;}
        if(this.visible){
            if(this.cursor){this.cursor.clear()}
        } else {
            this.moveCursor(editor, this.pos)
        }
        this.visible = !this.visible
    }
    moveCursor(editor: CodeMirror.Editor, pos: CodeMirror.Position){
        this.pos = pos
        console.log(this.pos, pos)
        if(this.cursor){this.cursor.clear()}
        const widget = createCursorWidget(this.color, 'user-cursor', this.name)
		this.cursor = editor.getDoc().setBookmark(pos, {widget})
        
    }
}
export class EditorSession {
    public userList: Map<string,User>
    public editor: CodeMirror.Editor
    private colorList = ['blue', 'yellow','green','red']
    constructor(){
        this.userList = new Map()
    }
    public moveCursor(id: string, line: number, ch: number){
        let user = this.userList.get(id)
 
        user.moveCursor(this.editor, new CodeMirror.Pos(line,ch))
 
        
        this.userList.set(id, user)
    }
    public toggleCursor(id: string) {
        console.log('alo')
        let user = this.userList.get(id)
        user.toggleCursor(this.editor)
        this.userList.set(id, user)
    }
    public addUser(user: User): void {
        user.color = this.colorList.pop()
        if(!user.color){user.color = getRandomColor()}
        this.userList.set(user.name,user);
    }
}
const getRandomColor = () => {
    const r = Math.floor(Math.random() * 90);
    const g = Math.floor(Math.random() * 150);
    const b = Math.floor(Math.random() * 90);
    return `rgb(${r},${g},${b})`
}
const createCursorWidget = (color: string, className: string, textContent: string): HTMLElement => {
    let _widget = document.createElement('span')

    let cursor = document.createElement('span')
        cursor.classList.add('eval-position')
        cursor.classList.add('custon-cursor')
        cursor.setAttribute('style', 'background-color: ' + color)

    let nametag = document.createElement('span')
        nametag.classList.add('eval-position')
        nametag.classList.add('nametag')
        nametag.setAttribute('style', 'background-color: ' + color)
        nametag.textContent = textContent


    cursor.appendChild(nametag)
    _widget.appendChild(cursor)
    return _widget
}