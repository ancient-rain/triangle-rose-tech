import { FirebaseFileSnapshot } from "./firebase-file-snapshot";

export class LatePlate {
    public photoUrl: string;
    public initials: string;

    constructor(obj?: any) {
        this.photoUrl = obj && obj.photoUrl || '';
        this.initials = obj && obj.initials || '';
    }
}