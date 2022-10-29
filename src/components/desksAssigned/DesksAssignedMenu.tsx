import { useContext} from "react";
import { DesksAssignedContext } from "../../contexts/DesksAssignedContext";
import { DesksContext, DesksContent } from "../../contexts/DesksContext";
import DeskAssigned from "./DeskAssigned";
import {Employee} from "../../models/Employee";
import AddDeskPopup from "../popups/DeskPopups.tsx/AddDeskPopup";
import { IconAddElement } from "../icons/IconAddElement";

function DesksAssignedMenu() {
    let deskContext = useContext<DesksContent>(DesksContext);
    let {assignAllDesks, unassignAllDesks} = useContext(DesksAssignedContext);

    function handleAssignAllDesk(evt) {
        evt.preventDefault();
        const employeesUnassigned: Employee[] = assignAllDesks();
        window.alert(employeesUnassigned.map((employee)=> employee.name).join(', '));
    }

    function handleUnassignAllDesk(evt) {
        evt.preventDefault();
        unassignAllDesks();
    }

    return (
        <div className="border-2 bg-orange-200 w-full h-full">
            <h3 className="text-center font-bold">Desks Assigned</h3>
            <ul className="grid grid-flow-row-dense grid-flow-rows grid-cols-2 sm:grid-cols-4 gap-4">
                {deskContext.desks.map(desk => (
                    <DeskAssigned
                    key={desk.id}
                    desk={desk} />
                ))}
                <AddDeskPopup>
                    {IconAddElement}
                </AddDeskPopup>
            </ul>
            <div className="flex align-end gap-2">
                <button className="btn btn-primary" onClick={(evt) => handleAssignAllDesk(evt)}>Assign all desks</button>
                <button className="btn btn-primary" onClick={(evt) => handleUnassignAllDesk(evt)}>Unassign all desks</button>
            </div>
        </div>
    )
}

export default DesksAssignedMenu;