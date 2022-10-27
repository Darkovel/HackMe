import { useContext} from "react";
import { DesksAssignedContext } from "../../contexts/DesksAssignedContext";
import { DesksContext, DesksContent } from "../../contexts/DesksContext";
import {Desk} from "../../models/Desk";
import DeskAssigned from "./DeskAssigned";
import {Employee} from "../../models/Employee";

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
            <ul className="grid grid-flow-row-dense grid-flow-rows grid-cols-4 gap-4">
                {deskContext.desks.map(desk => (
                    <DeskAssigned
                    key={desk.id}
                    desk={desk} />
                ))}
            </ul>
            <button className="btn btn-primary" onClick={(evt) => handleAssignAllDesk(evt)}>Assign all desks</button>
            <button className="btn btn-primary" onClick={(evt) => handleUnassignAllDesk(evt)}>Unassign all desks</button>
        </div>
    )
}

export default DesksAssignedMenu;