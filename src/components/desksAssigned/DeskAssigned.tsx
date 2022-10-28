import { EyeOpenIcon, Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';
import {useContext, useState} from 'react';
import { DesksAssignedContext, DesksAssignedContent } from "../../contexts/DesksAssignedContext";
import { DesksContext } from '../../contexts/DesksContext';
import {Desk} from "../../models/Desk";
import InfoDeskPopup from '../popups/DeskPopups.tsx/InfoDeskPopup';

type DeskAssignedProps = {
    desk: Desk
}

function DeskAssigned({desk}: DeskAssignedProps) {
    const [showIcon, setShowIcon] = useState<Boolean>(false);
    const {desksAssigned, getEmployeeAssigned} = useContext<DesksAssignedContent>(DesksAssignedContext);
    const {removeDesk} = useContext(DesksContext);

    function handleShow() {
        const icons = document.getElementById('icons');
        if(!showIcon) {
            icons.className = 'block';
        } else {
            icons.className = 'hidden group-hover:block';
        }

        setShowIcon(!showIcon);
    }

    return (
        <div>
            <div className="group grid">
                <h4 className="text-center font-bold text-base">{desksAssigned.some((deskAssigned) => deskAssigned.deskId === desk.id) ? getEmployeeAssigned(desk.id).name : "Unassigned"}</h4>
                <div className="relative justify-self-center w-12 h-12 sm:w-24 sm:h-24 rounded-full bg-blue-500">
                    <div id='icons' className='hidden group-hover:block'>
                        <InfoDeskPopup deskId={desk.id}><EyeOpenIcon className='absolute -right-3 -top-1'/></InfoDeskPopup>
                        <Pencil1Icon className='absolute -right-5 top-3 sm:-right-7 sm:top-5'/>
                        <TrashIcon className='absolute -right-4 top-8 sm:-right-6 sm:top-12' onClick={() => removeDesk(desk.id)}/>
                    </div>
                </div>
                <p className="text-center">{desk.name}</p>
            </div>
        </div>
        
    )
}

export default DeskAssigned;