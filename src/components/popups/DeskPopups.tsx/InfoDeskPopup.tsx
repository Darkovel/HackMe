import {useState, useContext, ChangeEvent, FormEvent, ReactElement} from 'react';
import { DesksAssignedContext } from '../../../contexts/DesksAssignedContext';
import { DesksContent, DesksContext} from '../../../contexts/DesksContext';
import { DeskData } from '../../../models/Desk';
import { DeskAssigned } from '../../../models/DeskAssigned';

interface Props {
    children: ReactElement;
    deskId: string;
}
function InfoDeskPopup({children, deskId}: Props) {
    const {getDesk} = useContext(DesksContext);
    const {getEmployeeAssigned} = useContext(DesksAssignedContext);
    const [showPopup, setShowPopup] = useState<Boolean>(false);

    function handleShow() {
        setShowPopup(true);
    }
      
    function handleHide() {
        setShowPopup(false);
    }

    const popupContainer = showPopup ? (
        <div className="flex fixed z-[995] bg-gray-200/50 inset-0 items-center justify-center" onClick={() => handleHide() }>
            <div className="fixed w-auto h-auto bg-gray-400 z-[999] p-5 rounded-lg shadow-md">
                <h3 className='select-none text-center'>{getDesk(deskId).name}</h3>
                <div className='flex h-1 bg-gray-200 w-2/3 rounded-lg m-auto my-2'></div>
                <div className="flex flex-col space-y-2 justify-center">
                    <div>
                        <p>Assigned to :</p>
                        <p>{getEmployeeAssigned(deskId) === undefined ? 'unassigned': getEmployeeAssigned(deskId).name}</p>
                    </div>
                    <div>
                        <p>Description :</p>
                        <p>{getDesk(deskId).description}</p>
                    </div>
                </div>
            </div>
        </div>
        ) : null;

    return (
        <>
        <button onClick={handleShow}>
            {children}
        </button>

        {popupContainer}
        </>
    )
}

export default InfoDeskPopup;