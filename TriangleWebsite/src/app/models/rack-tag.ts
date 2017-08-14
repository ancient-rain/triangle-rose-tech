import { FirebaseFileSnapshot } from "./firebase-file-snapshot";

export class RackTag {
    public photoUrl: string;
    public initials: string;
    public rack: string;

    constructor(obj?: any) {
        this.photoUrl = obj && obj.photoUrl || '';
        this.initials = obj && obj.initials || '';
        this.rack = obj && obj.rack || '';
    }
}