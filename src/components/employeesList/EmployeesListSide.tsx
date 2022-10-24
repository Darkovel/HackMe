import Employee from "../../models/Employee";
import EmployeeListElement from "./EmployeeListElement";

function EmployeesListSide() {
const employees:Employee[] = [];

    return (
        <div>
            <h3>Employees</h3>
            <ul>
                {employees.map(employee => (
                    <EmployeeListElement
                    key={employee.id}
                    employee={employee} />
                ))}
            </ul>
        </div>
    )
}

export default EmployeesListSide;