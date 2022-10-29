import { createContext } from "react"
import { DeskAssigned } from "../models/DeskAssigned"
import { Employee } from "../models/Employee";

export type DesksAssignedContent = {
    desksAssigned: DeskAssigned[];
    assignADesk: (deskId: string, employeeId: string) => void,
    assignAllDesks: () => Employee[],
    unassignADesk: (deskId:string) => void, 
    unassignAllDesks: () => void,
    getEmployeeAssigned: (deskId: string) => Employee|undefined,
    getUnassignedEmployees: () => Employee[],
}

export const DesksAssignedContext = createContext<DesksAssignedContent>({
    desksAssigned: [],
    assignADesk: (deskId: string, employeeId: string) => {},
    assignAllDesks: () => [],
    unassignADesk: (deskId:string) => {}, 
    unassignAllDesks: () => {},
    getEmployeeAssigned: (deskId: string) => undefined,
    getUnassignedEmployees: () => [],
})