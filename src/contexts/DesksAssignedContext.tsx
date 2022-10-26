import { createContext } from "react"
import { DeskAssigned } from "../models/DeskAssigned"
import { Employee } from "../models/Employee";

export type DesksAssignedContent = {
    desksAssigned: DeskAssigned[];
    assignAllDesks: () => Employee[],
}

export const DesksAssignedContext = createContext<DesksAssignedContent>({
    desksAssigned: [],
    assignAllDesks: () => [],
})