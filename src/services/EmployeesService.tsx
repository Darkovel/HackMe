import {v4 as uuidv4} from 'uuid';
import { useState } from "react";
import {Employee, EmployeeData} from '../models/Employee';
import {EmployeesContext, EmployeesContent} from '../contexts/EmployeesContext';

type Props = {
    children: JSX.Element | JSX.Element[],
};

function EmployeesService({children}:Props) {
    let [employees, setEmployees] = useState<Employee[]>([ 
        {
            id: "1",
            name: "Verdelet",
            email: "gregoire.verdelet@gmail.com",
            listDesk:[{id:"1", name:"desk-1"}]
        },
        {
            id: "2",
            name: "Boudah",
            email: "Boudah@gmail.com",
            listDesk:[{id:"1", name:"desk-1"}, {id:"2", name:"desk-2"}]
        },
        {
            id: "3",
            name: "Alfred",
            email: "Alfred@gmail.com",
            listDesk:[{id:"3", name:"desk-3"}]
        },
        {
            id: "4",
            name: "Ginger",
            email: "Ginger@gmail.com",
            listDesk:[{id:"2", name:"desk-2"}]
        },
        {
            id: "5",
            name: "Patouf",
            email: "Patouf@gmail.com",
            listDesk:[]
        },
    ]);
    let value: EmployeesContent = {
        employees,
        getEmployee,
        addEmployee,
        removeEmployee,
        editEmployee,
        removeDeskInPrefs,
    }

    function getEmployee(id: string) {
        let employeeData: EmployeeData = {name:'', email:'', listDesk:[], description: ''};

        if(employees.some((employee) => employee.id === id)) {
            employeeData = employees.find((employee) => employee.id === id);
        }
        
        return employeeData;
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

    function removeDeskInPrefs(deskId: string) {
        setEmployees(employees.map((employee) => {return {...employee, listDesk:employee.listDesk.filter((desk) => desk.id !== deskId)}}));
    }

    return (
        <EmployeesContext.Provider value={value}>{children}</EmployeesContext.Provider>
    )
}

export default EmployeesService;