import React, { FormEvent, useContext, useState } from "react";
import {EmployeesContext, EmployeesContent} from "../../contexts/EmployeesContext";
import {Desk} from "../../models/Desk";
import {EmployeeData} from "../../models/Employee";
import EmployeeListElement from "./EmployeeListElement";

function EmployeesListSide() {
  let context = useContext<EmployeesContent>(EmployeesContext);
  let [employee, setEmployee] = useState<EmployeeData>({
    name: "",
    email: ""
  });

  function onChange(name:string, value:string) {
    setEmployee({...employee, [name]: value});
  }

  function onSubmit(evt:FormEvent) {
    evt.preventDefault();
    if(employee.name === "")
      return;

      context.addEmployee(employee);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.name, e.target.value)
  }
  
return (
  <div className="border-2 bg-blue-200 w-1/3 max-w-sm h-screen">
    <h3 className="text-center font-bold">Employees</h3>
    <ul>
      {context?.employees.map(employee => (
        <EmployeeListElement
        key={employee.id}
        employee={employee} />
      ))}
    </ul>
    <div className="border-2 border-red-500 w-full">
      <form onSubmit={(evt: FormEvent) => onSubmit(evt)}>
        <div className="form-group">
          <label htmlFor="name">Nom</label>
          <input type="text" name="name" id="name" className="form-control" value={employee.name || ''} onChange={(e) => handleChange(e)}></input>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="text" name="email" id="email" className="form-control" value={employee.email || ''} onChange={(e) => handleChange(e)}></input>
        </div>
        <button className="btn btn-primary">Ajouter Employé</button>
      </form>
    </div>
  </div>);
}

export default EmployeesListSide;