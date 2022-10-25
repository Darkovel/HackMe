import { createContext } from "react";
import {Desk, DeskData} from "../models/Desk"

export type DesksContent = {
    desks: Desk[],
    addDesk: (newDesk: DeskData) => void,
    removeDesk: (id: string) => void,
    editDesk: (deskEdited: Desk) => void,
}

export const DesksContext = createContext<DesksContent>({
    desks: [],
    addDesk: (newDesk: DeskData) => {},
    removeDesk: (id: string) => {},
    editDesk: (deskEdited: Desk) => {},
})