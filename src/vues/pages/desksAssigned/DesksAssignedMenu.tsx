import DeskAssigned from "./DeskAssigned";
import {Employee} from "../../../models/entities/Employee";
import AddDeskPopup from "../../components/popups/DeskPopups.tsx/AddDeskPopup";
import { IconAddElement } from "../../components/icons/IconAddElement";
import { useObservable, useOffice } from "../../providers/OfficeProvider";
import { Desk } from "../../../models/entities/Desk";
function DesksAssignedMenu() {
    const office = useOffice();
    
    const desks = useObservable<Desk[]>(office.desksChanged, office.desks);


    function handleAssignAllDesk(evt) {
        evt.preventDefault();
        office.assignAllDesk();
        const employeesUnassigned: Employee[] = office.getEmployeesUnassigned();
        window.alert(employeesUnassigned.map((employee)=> employee.name).join(', '));
    }

    function handleUnassignAllDesk(evt) {
        evt.preventDefault();
        office.unassignAllDesk();
    }

    return (
        <div className="overflow-y-auto border-2 bg-orange-200 h-full w-full pt-12">
            <h3 className="text-center font-bold mb-4 sm:mb-8">Desks Assigned</h3>
            <ul className="grid grid-flow-row-dense grid-flow-rows grid-cols-2 sm:grid-cols-4 gap-4">
                {desks.map(desk => (
                    <DeskAssigned
                    key={desk.id}
                    desk={desk} />
                ))}
                <AddDeskPopup>
                    {IconAddElement}
                </AddDeskPopup>
            </ul>
            <div className="flex flex-row-reverse align-end gap-2">
                <button className="btn btn-primary" onClick={(evt) => handleUnassignAllDesk(evt)}>Unassign all desks</button>
                <button className="btn btn-primary" onClick={(evt) => handleAssignAllDesk(evt)}>Assign all desks</button>
            </div>
        </div>
    )
}

export default DesksAssignedMenu;