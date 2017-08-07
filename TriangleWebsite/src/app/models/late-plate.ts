import { FirebaseFileSnapshot } from "./firebase-file-snapshot";

export class LatePlate extends FirebaseFileSnapshot {
    public key: string;
    public photoUrl: string;
    public initials: string;

    constructor(obj?:any){
        super(obj);
        this.key = obj && obj.key || '';
        this.photoUrl = obj && obj.photoUrl || '';
        this.initials = obj && obj.initials || '';
    }
}