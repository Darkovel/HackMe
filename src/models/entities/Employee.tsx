import {DeskId} from './Desk';
import {v4 as uuidv4} from 'uuid';

export type EmployeeId = string;

export type EmployeeData = {
    name: string;
    email: string;
    listDesk: DeskId[];
    description?: string;
};

export class Employee {
    private _id: EmployeeId ;
    private _data:EmployeeData;

    constructor(data:EmployeeData) {
        this._data = data;
        this._id = uuidv4();
    }

    public editEmployee(data:EmployeeData) {
        this._data = data;
    }

    public removeDeskPref(deskId:DeskId) {
        this._data.listDesk = this._data.listDesk.filter((deskPrefId) => deskPrefId !== deskId);
    }


//#region getters
    get id() : EmployeeId { return this._id; }
    get name() : string { return this._data.name; }
    get email() : string { return this._data.email; }
    get listDesk() : DeskId[] { return this._data.listDesk; }
    get description() : string { return this._data.description; }
//#endregion
}