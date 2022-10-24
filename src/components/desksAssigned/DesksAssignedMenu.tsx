import Desk from "../../models/Desk";
import DeskAssigned from "./DeskAssigned";

function DesksAssignedMenu() {
    const desks:Desk[] = [];

    return (
        <div className="border-2 border-orange-500 w-full h-max">
            <h3 className="text-center font-bold">Desks Assigned</h3>
            <ul className="m-2">
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