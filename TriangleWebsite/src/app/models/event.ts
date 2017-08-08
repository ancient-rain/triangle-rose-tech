import { FirebaseFileSnapshot } from "./firebase-file-snapshot";

export class MyEvent extends FirebaseFileSnapshot {
    public authorKey?: string;
    public date: string;
    public name: string;

    constructor(obj?:any){
        super(obj);
        this.authorKey = obj && obj.authorKey || "";
        this.date = obj && obj.date || "";
        this.name = obj && obj.name || "";
    }
}