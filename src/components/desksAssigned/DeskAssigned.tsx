import { EyeOpenIcon, Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';
import {useContext, useState} from 'react';
import { DesksAssignedContext, DesksAssignedContent } from "../../contexts/DesksAssignedContext";
import { DesksContext } from '../../contexts/DesksContext';
import { EmployeesContext } from '../../contexts/EmployeesContext';
import {Desk} from "../../models/Desk";
import EditDeskPopup from '../popups/DeskPopups.tsx/EditDeskPopup';
import InfoDeskPopup from '../popups/DeskPopups.tsx/InfoDeskPopup';

type DeskAssignedProps = {
    desk: Desk
}

function DeskAssigned({desk}: DeskAssignedProps) {
    const [showIcon, setShowIcon] = useState<Boolean>(false);
    const {desksAssigned, getEmployeeAssigned} = useContext<DesksAssignedContent>(DesksAssignedContext);
    const {removeDesk} = useContext(DesksContext);
    const {removeDeskInPrefs} = useContext(EmployeesContext);

    function handleShow() {
        const icons = document.getElementById(desk.id + 'icons');
        if(!showIcon) {
            icons.className = 'absolute block top-8 right-5 sm:right-8';
        } else {
            icons.className = 'absolute hidden group-hover:block top-8 right-5 sm:right-8';
        }

        setShowIcon(!showIcon);
    }

    function handleRemoveDesk() {
        removeDeskInPrefs(desk.id);
        removeDesk(desk.id);
    }

    return (
        <div className="group relative">
            <div className="grid">
                <h4 className="text-center font-bold text-base">{getEmployeeAssigned(desk.id) !== undefined ? getEmployeeAssigned(desk.id).name : "Unassigned"}</h4>
                <div className="relative justify-self-center">
                <EditDeskPopup deskId={desk.id}>
                    <div className="w-12 h-12 sm:w-24 sm:h-24 rounded-full bg-blue-500"></div>
                </EditDeskPopup>
                </div>
                <p className="text-center">{desk.name}</p>
            </div>
            <div id={desk.id + 'icons'} className='absolute hidden sm:group-hover:block group-hover:top-8 group-hover:right-5 group-hover:sm:right-8'>
                    <InfoDeskPopup deskId={desk.id}><EyeOpenIcon className='absolute -right-3 -top-1'/></InfoDeskPopup>
                    <TrashIcon className='absolute -right-5 top-3 sm:-right-7 sm:top-5 cursor-pointer' onClick={() => handleRemoveDesk()}/>
            </div>
        </div>
    )
}

export default DeskAssigned;