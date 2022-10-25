import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { DesksContext, DesksContent } from "../../contexts/DesksContext";
import {Desk, DeskData} from "../../models/Desk";
import DeskListElement from "./DeskListElement";

function DesksListTop() {
    let context = useContext<DesksContent>(DesksContext);
    let [desk, setDesk] = useState<DeskData>({
        name:'',
    }) 

    function handleChange(evt: ChangeEvent<HTMLInputElement>) {
        setDesk({name: evt.target.value});
    }

    function handleSubmit(evt: FormEvent<HTMLFormElement>) {
        evt.preventDefault();
        context.addDesk(desk);
        setDesk({name: ''});
    }

    return (
        <div className="border-2 bg-red-200 w-full">
            <h3 className="px-2 font-bold">Desks</h3>
            <ul className="flex mx-4 gap-2">
                {context.desks.map(desk => (
                    <DeskListElement 
                    key={desk.id}
                    desk={desk} />
                ))}
            </ul>
            <div className="flex gap-4 justify-left">
                <form className="flex space-x-1 justify-center" onSubmit={(evt) => handleSubmit(evt)}>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" className="form-control" value={desk.name} onChange={(evt) => handleChange(evt)}></input>
                    <button className="btn btn-primary" type="submit">Add</button>
                </form>
            </div>
        </div>
    )
}

export default DesksListTop;