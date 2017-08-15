import { FirebaseFileSnapshot } from "./firebase-file-snapshot";

export class RackTag extends FirebaseFileSnapshot {
    public authorKey?: string;
    public sleeperImage: string;
    public sleeperName: string;

    constructor(obj?:any){
        super(obj);
        this.authorKey = obj && obj.authorKey || "";
        this.sleeperImage = obj && obj.sleeperImage || "";
        this.sleeperName = obj && obj.sleeperName || "";
    }
}