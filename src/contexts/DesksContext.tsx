import { createContext } from "react";
import {Desk, DeskData} from "../models/Desk"

export type DesksContent = {
    desks: Desk[],
    getDesk: (id:string) => DeskData;
    addDesk: (newDesk: DeskData) => void,
    removeDesk: (id: string) => void,
    editDesk: (deskEdited: Desk) => void,
}

export const DesksContext = createContext<DesksContent>({
    desks: [],
    getDesk: (id:string) => {return {name:'', description:''}},
    addDesk: (newDesk: DeskData) => {},
    removeDesk: (id: string) => {},
    editDesk: (deskEdited: Desk) => {},
})