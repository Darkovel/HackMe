import Desk from "../../models/Desk";
import DeskListElement from "./DeskListElement";

function DesksListTop() {
    const desks:Desk[] = [];

    return (
        <div>
            <h3>Desks</h3>
            <ul>
                {desks.map(desk => (
                    <DeskListElement 
                    key={desk.id}
                    desk={desk} />
                ))}
            </ul>
        </div>
    )
}

export default DesksListTop;