import Desk from "../../models/Desk";
import DeskAssigned from "./DeskAssigned";

function DesksAssignedMenu() {
    const desks:Desk[] = [];

    return (
        <div>
            <h3>Desks Assigned</h3>
            <ul>
                {desks.map(desk => (
                    <DeskAssigned
                    key={desk.id}
                    desk={desk} />
                ))}
            </ul>
        </div>
    )
}

export default DesksAssignedMenu;