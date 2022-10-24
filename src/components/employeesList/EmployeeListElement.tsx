import Employee from "../../models/Employee";

type EmployeeProps = {
    employee: Employee
}

function EmployeeListElement({employee}: EmployeeProps) {
    return (
        <div>{employee.name}</div>
    )
}

export default EmployeeListElement;