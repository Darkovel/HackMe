import Employee from "../../models/Employee";

function EmployeeListElement(props:any) {
    const {Employee:employee} = props;
    return (
        <div>{employee.name}</div>
    )
}

export default EmployeeListElement;