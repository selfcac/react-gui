export class Domain {
    Name: string = "";
    Blocked: boolean = false;

    constructor(name? : string, blocked?: boolean) {
        this.Name = name ? name : "";
        this.Blocked = blocked ? true : false;
    }
}