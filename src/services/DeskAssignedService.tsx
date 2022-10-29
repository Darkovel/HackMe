import {useState, useEffect, useContext} from 'react';
import { EmployeesContent, EmployeesContext } from '../contexts/EmployeesContext';
import { DesksContent, DesksContext } from '../contexts/DesksContext';
import { DeskAssigned } from '../models/DeskAssigned';
import { DesksAssignedContent, DesksAssignedContext } from '../contexts/DesksAssignedContext';
import { Desk } from '../models/Desk';
import { Employee } from '../models/Employee';

interface Props {
    children: JSX.Element | JSX.Element[]
}

function DeskAssignedService({children}: Props) {
    const {employees} = useContext<EmployeesContent>(EmployeesContext);
    const {desks} = useContext<DesksContent>(DesksContext);
    const [desksAssigned, setDesksAssigned] = useState<DeskAssigned[]>([]);

    const key = "semana-desksAssigned";
    useEffect(() => {
        const desksAssignedRetrievedFromStorage = localStorage.getItem(key);

        if(desksAssignedRetrievedFromStorage) {
        setDesksAssigned(JSON.parse(desksAssignedRetrievedFromStorage));
        }
    },[]);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(desksAssigned));
    }, [desksAssigned]);

    let desksAssignedTempTable: DeskAssigned[] = [];

    const value: DesksAssignedContent = {
        desksAssigned,
        assignADesk,
        assignAllDesks,
        unassignADesk,
        unassignAllDesks,
        getEmployeeAssigned,
        getUnassignedEmployees,
    }

    type DeskConflictual = {
        id: string,
        employees: Employee[],
    }

    function assignADesk(deskId: string, employeeId: string) {
        let deskAssigned = desksAssigned.find((deskAssigned) => deskAssigned.deskId === deskId);
        if(deskAssigned && deskAssigned.employeeId===employeeId)
            return;

        unassignEmployee(employeeId);

        if(deskAssigned) {
            setDesksAssigned(desksAssigned.map((deskAssigned) => deskAssigned.deskId !== deskId ? deskAssigned : {deskId, employeeId}));
        } else {
            setDesksAssigned([...desksAssigned, {deskId, employeeId}]);
        }
    }

    function unassignAllDesks() {
        desksAssignedTempTable=[];
        setDesksAssigned([]);
    }

    function unassignADesk(deskId: string) {
        setDesksAssigned(desksAssigned.filter((deskAssigned) => deskAssigned.deskId !== deskId));
    }

    function unassignEmployee(employeeId:string) {
        setDesksAssigned(desksAssigned.filter((deskAssigned) => deskAssigned.employeeId !== employeeId));
    }

    function getEmployeeAssigned(deskId: string) {
        const deskAssigned = desksAssigned.find((deskAssigned) => deskAssigned.deskId === deskId);
        
        if(!deskAssigned)
            return undefined;

        const employeeAssigned = employees.find((employee) => employee.id === deskAssigned.employeeId)
        if(!employeeAssigned) {
            unassignADesk(deskId);
            return undefined;
        }
            
        return employeeAssigned;
    }

    function getUnassignedDesks(): Desk[] {
        return desks.filter((desk) => !desksAssigned.some((deskAssigned) => desk.id === deskAssigned.deskId));
    }

    function getUnassignedEmployees(): Employee[] {
        return employees.filter((employee) => !desksAssigned.some((deskAssigned) => employee.id === deskAssigned.employeeId));
    }

    function assignAllDesks(): Employee[] {
        desksAssignedTempTable = desksAssigned;
        let deskToAssign: Desk[] = getUnassignedDesks();
        let employeeWithoutDesk: Employee[] = getUnassignedEmployees();
        
        employeeWithoutDesk = assignDeskByPref(deskToAssign, employeeWithoutDesk);
        deskToAssign = desks.filter((desk) => !desksAssignedTempTable.some((deskAssigned) => desk.id === deskAssigned.deskId));

        const employeesUnassigned = assignRandomly(deskToAssign, employeeWithoutDesk);
        setDesksAssigned(desksAssignedTempTable);

        return employeesUnassigned;
    }

    function assignDeskByPref(deskToAssign: Desk[], employeeWithoutDesk: Employee[], currentPrefIndex: number = 0): Employee[] {
        let deskFree: Desk[] = [];
        let deskConfitual: DeskConflictual[] = [];

        let employeeWithNoAnyPref: Employee[] = employeeWithoutDesk.filter((employee) => employee.listDesk.length <= currentPrefIndex);
        employeeWithoutDesk = employeeWithoutDesk.filter((employee) => employee.listDesk.length > currentPrefIndex);

        deskToAssign.forEach(desk => {
            let employeeExpectedThis: Employee[] = employeeWithoutDesk.filter((employee) => employee.listDesk[currentPrefIndex].id === desk.id);

            switch(employeeExpectedThis.length) {
                case 0:
                    deskFree.push(desk);
                    break;
                case 1:
                    assignDesk(desk.id, employeeExpectedThis[0].id);
                    let index = employeeWithoutDesk.indexOf(employeeExpectedThis[0]);
                    employeeWithoutDesk.splice(index, 1);
                    break;
                default:
                    deskConfitual.push({id:desk.id, employees:employeeExpectedThis});
            }
        });

        deskConfitual.forEach((desk) => {
            const selectedEmployee = resolveConflict(desk);
            assignDesk(desk.id, selectedEmployee.id);
            let index = employeeWithoutDesk.indexOf(selectedEmployee);
            employeeWithoutDesk.splice(index, 1);
        });

        if(deskFree.length > 0) {
            return [...employeeWithNoAnyPref, ...employeeWithoutDesk];
        }

        if(employeeWithoutDesk.length > 0) {
            employeeWithNoAnyPref = [...employeeWithNoAnyPref, ...assignDeskByPref(deskFree, employeeWithoutDesk, currentPrefIndex+1)];
        }

        return employeeWithNoAnyPref;
    }

    function resolveConflict(deskConflictual: DeskConflictual): Employee {

        return deskConflictual.employees[0];
    }

    function assignRandomly(deskToAssign: Desk[], employeeWithoutDesk: Employee[]): Employee[] {
        while(deskToAssign.length > 0 && employeeWithoutDesk.length > 0) {
            let deskIndex = Math.floor(Math.random() * (deskToAssign.length-1));
            let employeeIndex = Math.floor(Math.random() * (employeeWithoutDesk.length-1));

            assignDesk(deskToAssign[deskIndex].id, employeeWithoutDesk[employeeIndex].id);

            deskToAssign.splice(deskIndex,1);
            employeeWithoutDesk.splice(employeeIndex,1);
        }

        return employeeWithoutDesk;
    }

    function assignDesk(deskId: string, employeeId: string) {
        if(desksAssignedTempTable.findIndex((desk) => desk.deskId === deskId) != -1) {
            desksAssignedTempTable = desksAssignedTempTable.map((desk) => desk.deskId !== deskId ? desk : {deskId, employeeId});
        } else {
            desksAssignedTempTable = [...desksAssignedTempTable, {deskId, employeeId}];
        }
    }



    return (
        <DesksAssignedContext.Provider value={value}>{children}</DesksAssignedContext.Provider>
    );
}

export default DeskAssignedService;