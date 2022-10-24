import Desk from "../../models/Desk";

type DeskAssignedProps = {
    desk: Desk
}

function DeskAssigned({desk}: DeskAssignedProps) {
    return (
        <div>
            <h4>Desk Assigned</h4>
            <p>{desk.name}</p>
        </div>
    )
}

export default DeskAssigned;