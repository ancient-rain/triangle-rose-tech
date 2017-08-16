export class Dryer {
    public imageUrl: string;
    public user: string;
    public machine: string;
    public isUsed: boolean;

    constructor(obj?: any) {
        this.imageUrl = obj && obj.imageUrl || '';
        this.user = obj && obj.user || '';
        this.machine = obj && obj.machine || '';
        this.isUsed = obj && obj.isUsed || '';
    }
}