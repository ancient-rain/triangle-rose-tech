import { FirebaseFileSnapshot } from "./firebase-file-snapshot";

export class Event extends FirebaseFileSnapshot {
    public authorKey?: string;
    public date: string;
    public caption: string;

    constructor(obj?:any){
        super(obj);
        this.authorKey = obj && obj.authorKey || "";
        this.date = obj && obj.date || "";
        this.caption = obj && obj.caption || "";
    }
}