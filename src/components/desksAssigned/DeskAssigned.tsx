import Desk from "../../models/Desk";

function DeskAssigned(props: any) {
    const {Desk:desk} = props;
    return (
        <div>
            <h4>Desk Assigned</h4>
            <p>{desk.name}</p>
        </div>
    )
}

export default DeskAssigned;