import {Desk} from "../../models/Desk";

type DeskAssignedProps = {
    desk: Desk
}

function DeskAssigned({desk}: DeskAssignedProps) {
    return (
        <div className="grid border-2 border-slate-500">
            <h4 className="text-center font-bold">Desk Assigned</h4>
            <div className="justify-self-center w-24 h-24 rounded-full bg-blue-500"></div>
            <p className="text-center">{desk.name}</p>
        </div>
    )
}

export default DeskAssigned;