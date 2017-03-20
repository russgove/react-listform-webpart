export default class FieldDefinition {
    public restrictVisibilityTo: string;
    public retrictUpdateTo: string;
    public restrictVisibility: boolean;
    public restrictUpdate: boolean;

    constructor(public internalName: string) {
        this.restrictVisibilityTo = null;
        this.retrictUpdateTo = null;
        this.restrictVisibility = null;
        this.restrictUpdate = null;

    }


}