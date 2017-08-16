import { FirebaseFileSnapshot } from "./firebase-file-snapshot";

export class RackTag extends FirebaseFileSnapshot {
    public owner: string;
    public rackTime: string;

    constructor(obj?:any){
        super(obj);
        this.owner = obj && obj.owner || "";
        this.rackTime = obj && obj.rackTime || "";
    }
}