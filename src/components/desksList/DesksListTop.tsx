import Desk from "../../models/Desk";
import DeskListElement from "./DeskListElement";

function DesksListTop() {
    const desks:Desk[] = [{
        id: 1,
        name: "desk-1",
    },
    {
        id: 2,
        name: "desk-2",
    },
    {
        id: 3,
        name: "desk-3",
    },
];

    return (
        <div className="border-2 border-yellow-500 w-full">
            <h3 className="px-2 font-bold">Desks</h3>
            <ul className="flex mx-4 gap-2">
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