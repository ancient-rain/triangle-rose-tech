import { FirebaseFileSnapshot } from "./firebase-file-snapshot";

export class RackTag extends FirebaseFileSnapshot {
    public owner: string;
    public roomNumber: string;

    constructor(obj?:any){
        super(obj);
        this.owner = obj && obj.owner || "";
        this.roomNumber= obj && obj.roomNumber || "";
    }
}