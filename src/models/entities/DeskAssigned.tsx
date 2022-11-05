import { DeskId } from "./Desk"
import { EmployeeId } from "./Employee"

export class DeskAssigned {
    private _deskId: DeskId;
    private _employeeId: EmployeeId;

    constructor(deskId:DeskId, employeeId:EmployeeId) {
        this._deskId = deskId;
        this._employeeId = employeeId;
    }

    public changeAssignement(employeeId: EmployeeId) {
        this._employeeId = employeeId;
    }

//#region getters
    get deskId(): DeskId { return this._deskId; }
    get employeeId(): EmployeeId { return this._employeeId; }
//#endregion
}