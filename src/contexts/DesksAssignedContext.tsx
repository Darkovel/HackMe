import { createContext } from "react"
import { DeskAssigned } from "../models/DeskAssigned"
import { Employee } from "../models/Employee";

export type DesksAssignedContent = {
    desksAssigned: DeskAssigned[];
    assignAllDesks: () => Employee[],
    unassignAllDesks: () => void,
    getEmployeeAssigned: (deskId: string) => Employee|undefined,
}

export const DesksAssignedContext = createContext<DesksAssignedContent>({
    desksAssigned: [],
    assignAllDesks: () => [],
    unassignAllDesks: () => {},
    getEmployeeAssigned: (deskId: string) => undefined,
})