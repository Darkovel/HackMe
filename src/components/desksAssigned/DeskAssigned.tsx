import {useContext} from 'react';
import { DesksAssignedContext, DesksAssignedContent } from "../../contexts/DesksAssignedContext";
import {Desk} from "../../models/Desk";
import PopupTest from '../popups/PopupTest';

type DeskAssignedProps = {
    desk: Desk
}

function DeskAssigned({desk}: DeskAssignedProps) {
    const {desksAssigned, getEmployeeAssigned} = useContext<DesksAssignedContent>(DesksAssignedContext);

    return (
        <PopupTest>
            <div className="grid">
                <h4 className="text-center font-bold text-base">{desksAssigned.some((deskAssigned) => deskAssigned.deskId === desk.id) ? getEmployeeAssigned(desk.id).name : "Unassigned"}</h4>
                <div className="justify-self-center w-12 h-12 sm:w-24 sm:h-24 rounded-full bg-blue-500"></div>
                <p className="text-center">{desk.name}</p>
            </div>
        </PopupTest>
        
    )
}

export default DeskAssigned;