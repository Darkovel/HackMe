import {Desk} from "../../models/Desk";

type DeskProps = {
    desk: Desk
}

function DeskListElement({desk} : DeskProps) {

    return (
        <div className="grid">
            <div className="justify-self-center w-12 h-12 rounded-full bg-blue-500"></div>
            <p className="text-center">{desk.name}</p>
        </div>
    )
}

export default DeskListElement;