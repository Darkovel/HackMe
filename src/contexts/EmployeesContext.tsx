import { createContext } from "react";
import {Employee, EmployeeData} from '../models/Employee';

export type EmployeesContent = {
    employees : Employee[];
    getEmployee: (id: string) => EmployeeData;
    addEmployee: (newEmployee: EmployeeData) => void;
    removeEmployee: (id:string) => void;
    editEmployee: (updateEmployee: Employee) => void;
    removeDeskInPrefs: (deskId: string) => void;
}

export const EmployeesContext = createContext<EmployeesContent>({
    employees:[],
    getEmployee: (id: string) => {return {name:'', email:'', listDesk:[], description:''}},
    addEmployee: (newEmployee: EmployeeData) => {},
    removeEmployee: (id:string) => {},
    editEmployee: (updateEmployee: Employee) => {},
    removeDeskInPrefs: (deskId: string) => {},
});