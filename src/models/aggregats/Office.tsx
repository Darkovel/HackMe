import { Subject } from "rxjs";
import { Assignment } from "../algorithms/Assignment";
import { Desk, DeskId, DeskData } from "../entities/Desk";
import { DeskAssigned } from "../entities/DeskAssigned";
import { Employee, EmployeeData, EmployeeId } from "../entities/Employee";

enum EventOffice{
    desk, employee, deskAssigned
}

export class Office {
    constructor(private _desks: Desk[], private _employees:Employee[], private _desksAssigned:DeskAssigned[]) {
    };

//#region events
    public readonly desksChanged = new Subject<Desk[]>();
    public readonly employeesChanged = new Subject<Employee[]>();
    public readonly desksAssignedChanged = new Subject<DeskAssigned[]>();

    private sendEvent(event:EventOffice) {
        switch(event) {
            case EventOffice.desk:
                this.desksChanged.next([...this._desks]);
                break;
            case EventOffice.employee:
                this.employeesChanged.next([...this._employees]);
                break;
            case EventOffice.deskAssigned:
                this.desksAssignedChanged.next([...this._desksAssigned]);
                break;
        }
    }
//#endregion

//#region Desks methods
    public getDesk(deskId: DeskId): Desk|undefined {
        return this._desks.find((desk) => desk.id === deskId);
    }

    public getDesks(desksId: DeskId[]): Desk[] {
        return desksId.map((deskId) => this.getDesk(deskId));
    }

    public addDesk(deskData: DeskData) {
        this._desks.push(new Desk(deskData));

        //Envoi l'event
        this.sendEvent(EventOffice.desk);
        
    }

    public editDesk(deskId: DeskId, newData:DeskData) {
        const deskEdited = this._desks.find((desk) => desk.id === deskId)
        
        if(!deskEdited)
            return;
            
        deskEdited.editData(newData);
        this._desks = this._desks.map((desk) => desk.id === deskId ? deskEdited : desk);

        //Envoi l'event
        this.sendEvent(EventOffice.desk);
    }

    public deleteDesk(deskId: DeskId) {
        this._desks = this._desks.filter((desk) => desk.id !== deskId);
        this._desksAssigned = this._desksAssigned.filter((desk) => desk.deskId !== deskId);
        this._employees.forEach((employee) => employee.removeDeskPref(deskId));

        console.log("deleteDesk");
        //Envoie l'event
        this.sendEvent(EventOffice.desk);
        this.sendEvent(EventOffice.employee);
        this.sendEvent(EventOffice.deskAssigned);
        
    }
//#endregion

//#region Employees methods
    public getEmployee(employeeId: EmployeeId): Employee|undefined {
        return this._employees.find((employee) => employee.id === employeeId);
    }

    public getEmployees(employeesId: EmployeeId[]): Employee[] {
        return employeesId.map((employeeId) => this.getEmployee(employeeId));
    }

    public addEmployee(employeeData: EmployeeData) {
        this._employees.push(new Employee(employeeData));

        //Envoi l'event
        this.sendEvent(EventOffice.employee);
    }

    public editEmployee(employeeId:EmployeeId, newData: EmployeeData) {
        const employeeEdited = this._employees.find((employee) => employee.id === employeeId);
        
        if(!employeeEdited)
            return;

        employeeEdited.editEmployee(newData);
        this._employees = this._employees.map((employee) => employee.id === employeeId ? employeeEdited : employee);

        //Envoi l'event
        this.sendEvent(EventOffice.employee);
    }

    public deleteEmployee(employeeId: EmployeeId) {
        this._employees = this._employees.filter((employee) => employee.id !== employeeId);
        this.unassignEmployee(employeeId);

        //Envoie l'event
        this.sendEvent(EventOffice.employee);
        this.sendEvent(EventOffice.deskAssigned);
    }
//#endregion

//#region DesksAssigned
    public getDeskAssigned(deskId: DeskId): DeskAssigned|undefined {
        return this._desksAssigned.find((deskAssigned) => deskAssigned.deskId === deskId);
    }

    public getEmployeeAssigned(deskId: DeskId): Employee|undefined {
        const currentDeskAssigned = this.desksAssigned.find((deskAssigned) => deskAssigned.deskId === deskId);

        if(!currentDeskAssigned) {
            return undefined;
        } 
        return this.getEmployee(currentDeskAssigned.employeeId);
    }

    public getDesksUnassigned(): Desk[] {
        return this.desks.filter((desk) => !this.desksAssigned.some((deskAssigned) => deskAssigned.deskId === desk.id));
    }

    public getEmployeesUnassigned(): Employee[] {
        return this.employees.filter((employee) => !this.desksAssigned.some((deskAssigned) => deskAssigned.employeeId === employee.id));
    }

    public getEmployeesAssigned(): Employee[] {
        return this.employees.filter((employee) => this.desksAssigned.some((deskAssigned) => deskAssigned.employeeId === employee.id));
    }

    public assignDesk(deskId: DeskId, employeeId: EmployeeId) {
        this.unassignDesk(deskId);
        this.unassignEmployee(employeeId);

        this._desksAssigned.push(new DeskAssigned(deskId, employeeId));

        // Envoi l'event
        this.sendEvent(EventOffice.deskAssigned);
    }

    public assignAllDesk() {
        const desksUnassigned:Desk[] = this.getDesksUnassigned();
        const employeesUnassigned:Employee[] = this.getEmployeesUnassigned();

        const newDeskAssigned:DeskAssigned[] = Assignment.assignByPref(desksUnassigned, employeesUnassigned);

        this._desksAssigned = [...this._desksAssigned, ...newDeskAssigned];

        //Envoi event
        this.sendEvent(EventOffice.deskAssigned);
    }

    public unassignADesk(deskId: DeskId) {
        this.unassignDesk(deskId);

        console.log(this._desksAssigned);
        //Envoi l'event
        this.sendEvent(EventOffice.deskAssigned);
    }

    private unassignDesk(deskId: DeskId) {
        this._desksAssigned = this._desksAssigned.filter((deskAssigned) => deskAssigned.deskId !== deskId);
    }

    private unassignEmployee(employeeId: EmployeeId) {
        this._desksAssigned = this._desksAssigned.filter((deskAssigned) => deskAssigned.employeeId !== employeeId);
    }

    public unassignAllDesk() {
        this._desksAssigned = [];

        //Envoi l'event
        this.sendEvent(EventOffice.deskAssigned);
    }
//#endregion

//#region getter
    get desks(): Desk[] { return this._desks; }
    get employees(): Employee[] { return this._employees; }
    get desksAssigned(): DeskAssigned[] { return this._desksAssigned; }
//#endregion
}