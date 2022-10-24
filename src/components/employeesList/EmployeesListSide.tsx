import React from "react";
import Employee from "../../models/Employee";
import EmployeeListElement from "./EmployeeListElement";

class EmployeesListSide extends React.Component {
  employees:Employee[] = [{
    id: 1,
    name: "Gregoire",
    email:"gregoire.verdelet@gmail.com"
  },
  {
    id: 2,
    name: "Gregoire2",
    email:"gregoire.verdelet@gmail.com"
  }];

render() {
    return (
        <div className="border-2 border-blue-500 w-1/3 max-w-sm h-screen">
            <h3 className="text-center font-bold">Employees</h3>
            <ul>
                {this.employees.map(employee => (
                    <EmployeeListElement
                    key={employee.id}
                    employee={employee} />
                ))}
            </ul>
        </div>
    );
}
    
}

export default EmployeesListSide;