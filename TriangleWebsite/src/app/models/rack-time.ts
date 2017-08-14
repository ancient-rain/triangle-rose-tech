export class RackTime {
    public time: string;
    public wordTime: string;

    constructor(obj?: any) {
        this.time = obj && obj.time || '';
        this.wordTime = obj && obj.wordTime || '';
    }
}