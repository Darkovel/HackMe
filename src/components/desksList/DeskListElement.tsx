import Desk from "../../models/Desk";

function DeskListElement(props: any) {
    const {Desk:desk} = props;

    return (
        <div>{desk.name}</div>
    )
}

export default DeskListElement;