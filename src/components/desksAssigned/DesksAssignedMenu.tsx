import { useContext} from "react";
import { DesksContext, DesksContent } from "../../contexts/DesksContext";
import {Desk} from "../../models/Desk";
import DeskAssigned from "./DeskAssigned";

function DesksAssignedMenu() {
    let deskContext = useContext<DesksContent>(DesksContext);

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
        </div>
    )
}

export default DesksAssignedMenu;