import { createContext } from "react";
import {Employee, EmployeeData} from '../models/Employee';

export type EmployeesContent = {
    employees : Employee[];
    addEmployee: (newEmployee: EmployeeData) => void;
    removeEmployee: (id:string) => void;
    editEmployee: (updateEmployee: Employee) => void;
}

export const EmployeesContext = createContext<EmployeesContent>({
    employees:[],
    addEmployee: (newEmployee: EmployeeData) => {},
    removeEmployee: (id:string) => {},
    editEmployee: (updateEmployee: Employee) => {},
});