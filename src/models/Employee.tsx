import {Desk} from './Desk';

export type Employee = {
    id: string;
    name: string;
    email: string;
    listDesk?: Desk[];
    description?: string;
};

export type EmployeeData = {
    name: string;
    email: string;
    listDesk?: Desk[];
    description?: string;
};