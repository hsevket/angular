export class ListItem {
    name:string;
    id: string;
    qty:number =1;
    completed:boolean= false;
    constructor(name:string, id:string){
        this.name=name;
        this.id = id;
        
    }
}