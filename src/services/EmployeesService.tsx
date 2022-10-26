import {v4 as uuidv4} from 'uuid';
import { createContext, useState } from "react";
import {Employee, EmployeeData} from '../models/Employee';
import {EmployeesContext, EmployeesContent} from '../contexts/EmployeesContext';

type Props = {
    children: JSX.Element | JSX.Element[],
};

function EmployeesService({children}:Props) {
    let [employees, setEmployees] = useState<Employee[]>([]);
    let value: EmployeesContent = {
        employees,
        addEmployee,
        removeEmployee,
        editEmployee,
    }

    function addEmployee(newEmployee:EmployeeData) {
        let id:string = uuidv4();
        let employeeAdded:Employee = {id ,...newEmployee};
    
        setEmployees([...employees, employeeAdded]);

    }

    function removeEmployee(id: string) {
        setEmployees(employees.filter((employee) => employee.id !== id));
    }

    function editEmployee(data:Employee) {
        setEmployees(employees.map((employee) => employee.id !== data.id ? employee : data));
    }

    return (
        <EmployeesContext.Provider value={value}>{children}</EmployeesContext.Provider>
    )
}

export default EmployeesService;