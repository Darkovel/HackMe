import {useContext} from 'react';
import { DesksAssignedContext } from "../../contexts/DesksAssignedContext";
import {Desk} from "../../models/Desk";
import EditDeskPopup from '../popups/DeskPopups.tsx/EditDeskPopup';

type DeskAssignedProps = {
    desk: Desk
}

function DeskAssigned({desk}: DeskAssignedProps) {
    const {getEmployeeAssigned} = useContext(DesksAssignedContext);


    return (
        <div className="group">
            <div className="grid">
                <h4 className="text-center font-bold text-base">{getEmployeeAssigned(desk.id) !== undefined ? getEmployeeAssigned(desk.id).name : "Unassigned"}</h4>
                <div className="justify-self-center">
                <EditDeskPopup deskId={desk.id}>
                    <div className="w-12 h-12 sm:w-24 sm:h-24 rounded-full bg-blue-500"></div>
                </EditDeskPopup>
                </div>
                <p className="text-center">{desk.name}</p>
            </div>
        </div>
    )
}

export default DeskAssigned;