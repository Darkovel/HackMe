import {v4 as uuidv4} from 'uuid';

export type DeskId = string;

export type DeskData = {
    name: string,
    description?: string,
}

export class Desk {
    private _id:DeskId;
    private _data:DeskData;

    constructor(data:DeskData) {
        this._data = data;
        this._id = uuidv4();
    }

    public editData(data: DeskData) {
        this._data = data;
    }

//#region getters
    get id() : DeskId { return this._id; }
    get name() : string { return this._data.name; }
    get description() : string { return this._data.description; }
//#endregion
}