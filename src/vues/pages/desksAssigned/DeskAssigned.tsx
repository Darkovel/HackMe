import {useContext} from 'react';
import {Desk} from "../../../models/entities/Desk";
import EditDeskPopup from '../../components/popups/DeskPopups.tsx/EditDeskPopup';
import { useOffice } from '../../providers/OfficeProvider';

type DeskAssignedProps = {
    desk: Desk
}

function DeskAssigned({desk}: DeskAssignedProps) {
    const office = useOffice();
    const employeeAssigned = office.getEmployeeAssigned(desk.id);
    
    return (
        <div className="group">
            <div className="grid">
                <h4 className="text-center font-bold text-base">{employeeAssigned !== undefined ? employeeAssigned.name : "Unassigned"}</h4>
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