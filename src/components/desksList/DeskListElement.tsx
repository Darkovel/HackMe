import Desk from "../../models/Desk";

type DeskProps = {
    desk: Desk
}

function DeskListElement({desk} : DeskProps) {

    return (
        <div>{desk.name}</div>
    )
}

export default DeskListElement;