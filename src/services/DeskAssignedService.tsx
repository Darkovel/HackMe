import {useState, useContext} from 'react';
import EmployeesService from './EmployeesService';
import DesksService from './DesksService';
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

    const value: DesksAssignedContent = {
        desksAssigned,
        assignAllDesks,
    }

    type DeskConflictual = {
        id: string,
        employees: Employee[],
    }

    function unassignAllDesks() {
        setDesksAssigned([]);
    }

    function getUnassignedDesks(): Desk[] {
        return desks.filter((desk) => !desksAssigned.some((deskAssigned) => desk.id === deskAssigned.deskId));
    }

    function getUnassignedEmployees(): Employee[] {
        return employees.filter((employee) => !desksAssigned.some((deskAssigned) => employee.id === deskAssigned.employeeId));
    }

    function assignAllDesks(): Employee[] {
        let deskToAssign: Desk[] = getUnassignedDesks();
        let employeeWithoutDesk: Employee[] = getUnassignedEmployees();
        
        let employeeWithNoAnyPref = assignDeskByPref(deskToAssign, employeeWithoutDesk);
        deskToAssign = desks.filter((desk) => !desksAssigned.some((deskAssigned) => desk.id === deskAssigned.deskId));

        return assignRandomly(deskToAssign, employeeWithNoAnyPref);
    }

    function assignDeskByPref(deskToAssign: Desk[], employeeWithoutDesk: Employee[], currentPrefIndex: number = 0): Employee[] {
        let deskFree: Desk[] = [];
        let deskConfitual: DeskConflictual[] = [];

        let employeeWithNoAnyPref: Employee[] = employeeWithoutDesk.filter((employee) => employee.listDesk.length <= currentPrefIndex);

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

        if(employeeWithoutDesk.length > 0 && deskFree.length > 0) {
            employeeWithNoAnyPref = [...employeeWithNoAnyPref, ...assignDeskByPref(deskFree, employeeWithoutDesk, ++currentPrefIndex)];
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
        if(desksAssigned.findIndex((desk) => desk.deskId === deskId)) {
            setDesksAssigned(desksAssigned.map((desk) => desk.deskId !== deskId ? desk : {deskId, employeeId}));
        } else {
            setDesksAssigned([...desksAssigned, {deskId, employeeId}]);
        }
    }



    return (
        <DesksAssignedContext.Provider value={value}>{children}</DesksAssignedContext.Provider>
    );
}